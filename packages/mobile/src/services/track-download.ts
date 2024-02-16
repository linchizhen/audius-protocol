import type { DownloadTrackArgs } from '@audius/common/services'
import { TrackDownload as TrackDownloadBase } from '@audius/common/services'
import { tracksSocialActions, downloadsActions } from '@audius/common/store'
import { Platform, Share } from 'react-native'
import { zip } from 'react-native-zip-archive'
import type {
  FetchBlobResponse,
  ReactNativeBlobUtilConfig,
  StatefulPromise
} from 'react-native-blob-util'
import ReactNativeBlobUtil from 'react-native-blob-util'
import { dedupFilenames } from '~/utils'

import { dispatch } from 'app/store'
import { setVisibility } from 'app/store/drawers/slice'

import { audiusBackendInstance } from './audius-backend-instance'

const { downloadFinished } = tracksSocialActions
const { beginDownload, setDownloadError, setFetchCancel, setFileInfo } =
  downloadsActions

let fetchTasks: StatefulPromise<FetchBlobResponse>[] = []

const audiusDownloadsDirectory = 'AudiusDownloads'

const cancelDownloadTask = () => {
  fetchTasks.forEach((task) => {
    task.cancel()
  })
}

const removePathIfExists = async (path: string) => {
  try {
    const exists = await ReactNativeBlobUtil.fs.exists(path)
    if (!exists) return
    await ReactNativeBlobUtil.fs.unlink(path)
  } catch {}
}

/**
 * Download a file via ReactNativeBlobUtil
 */
const downloadOne = async ({
  fileUrl,
  filename,
  directory,
  getFetchConfig,
  onFetchComplete
}: {
  fileUrl: string
  filename: string
  directory: string
  getFetchConfig: (filePath: string) => ReactNativeBlobUtilConfig
  onFetchComplete?: (path: string) => Promise<void>
}) => {
  const filePath = directory + '/' + filename

  try {
    const fetchTask = ReactNativeBlobUtil.config(getFetchConfig(filePath)).fetch(
      'GET',
      fileUrl
    )
    fetchTasks = [fetchTask]

    // TODO: The ReactNativeBlobUtil library is currently broken for download progress events on both platforms.
    // fetchTask.progress({ interval: 250 }, (received, total) => {
    //   dispatch(setDownloadedPercentage((received / total) * 100))
    // })

    const fetchRes = await fetchTask

    // Do this after download is done
    dispatch(setVisibility({ drawer: 'DownloadTrackProgress', visible: false }))

    await onFetchComplete?.(fetchRes.path())
  } catch (err) {
    console.error(err)
    dispatch(
      setDownloadError(
        err instanceof Error ? err : new Error(`Download failed: ${err}`)
      )
    )
    // On failure attempt to delete the file
    removePathIfExists(filePath)
  }
}

/**
 * Download multiple files via ReactNativeBlobUtil
 */
const downloadMany = async ({
  files,
  directory,
  getFetchConfig,
  onFetchComplete
}: {
  files: { url: string; filename: string }[]
  directory: string
  getFetchConfig: (filePath: string) => ReactNativeBlobUtilConfig
  onFetchComplete?: (path: string) => Promise<void>
}) => {
  dedupFilenames(files)
  try {
    const responsePromises = files.map(({ url, filename }) =>
      ReactNativeBlobUtil.config(getFetchConfig(directory + '/' + filename)).fetch(
        'GET',
        url
      )
    )
    fetchTasks = responsePromises
    const responses = await Promise.all(responsePromises)
    if (!responses.every((response) => response.info().status === 200)) {
      throw new Error('Download unsuccessful')
    }

    await zip(directory, directory + '.zip')
    await onFetchComplete?.(directory + '.zip')
    responses.forEach((response) => response.flush())
  } catch (err) {
    console.error(err)
    dispatch(
      setDownloadError(
        err instanceof Error ? err : new Error(`Download failed: ${err}`)
      )
    )
  } finally {
    // Remove source directory at the end of the process regardless of what happens
    removePathIfExists(directory)
  }
}

const download = async ({
  files,
  rootDirectoryName,
  abortSignal
}: DownloadTrackArgs) => {
  if (files.length === 0) return

  dispatch(beginDownload())

  dispatch(
    setFileInfo({
      trackName: rootDirectoryName ?? '',
      fileName: files[0].filename
    })
  )
  if (abortSignal) {
    abortSignal.onabort = () => {
      cancelDownloadTask()
    }
  }
  // TODO: Remove this method of canceling after the lossless
  // feature set launches. The abort signal should be the way to do
  // this task cancellation going forward.
  dispatch(setFetchCancel(cancelDownloadTask))

  const audiusDirectory =
    ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + audiusDownloadsDirectory

  if (Platform.OS === 'ios') {
    const onFetchComplete = async (path: string) => {
      try {
        dispatch(downloadFinished())
        await Share.share({
          url: path
        })
      } finally {
        // The fetched file is temporary on iOS and we always want to be sure to
        // remove it.
        removePathIfExists(path)
      }
    }
    if (files.length === 1) {
      const { url, filename } = files[0]
      downloadOne({
        fileUrl: url,
        filename,
        directory: audiusDirectory,
        getFetchConfig: (filePath) => ({
          /* iOS single file download will stage a file into a temporary location, then use the
           * share sheet to let the user decide where to put it. Afterwards we delete the temp file.
           */
          fileCache: true,
          path: filePath
        }),
        onFetchComplete
      })
    } else {
      downloadMany({
        files,
        directory: audiusDirectory + '/' + rootDirectoryName,
        getFetchConfig: (filePath) => ({
          /* iOS multi-file download will download all files to a temp location and then create a ZIP and
           * let the user decide where to put it with the Share sheet. The temp files are deleted after the ZIP is created.
           */
          fileCache: true,
          path: filePath
        }),
        onFetchComplete
      })
    }
  } else {
    if (files.length === 1) {
      const { url, filename } = files[0]
      downloadOne({
        fileUrl: url,
        filename,
        /* Single file download on Android will use the Download Manager and go
         * straight to the Downloads directory.
         */
        directory: ReactNativeBlobUtil.fs.dirs.DownloadDir,
        getFetchConfig: (filePath) => ({
          addAndroidDownloads: {
            description: filename,
            mediaScannable: true,
            notification: true,
            path: filePath,
            title: filename,
            useDownloadManager: true
          }
        }),
        onFetchComplete: async () => {
          dispatch(downloadFinished())
        }
      })
    } else {
      if (!rootDirectoryName)
        throw new Error(
          'rootDirectory must be supplied when downloading multiple files'
        )
      downloadMany({
        files,
        /* Multi-file download on Android will stage the files in a temporary directory
         * under the downloads folder and then zip them. We don't use Download Manager for
         * the initial downloads to avoid showing notifications, then manually add a
         * notification for the zip file.
         */
        directory: ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + rootDirectoryName,
        getFetchConfig: (filePath) => ({
          fileCache: true,
          path: filePath
        }),
        onFetchComplete: async (path: string) => {
          ReactNativeBlobUtil.android.addCompleteDownload({
            title: rootDirectoryName,
            description: rootDirectoryName,
            mime: 'application/zip',
            path,
            showNotification: true
          })
          dispatch(downloadFinished())
        }
      })
    }
  }
}

class TrackDownload extends TrackDownloadBase {
  async downloadTracks(args: DownloadTrackArgs) {
    await download(args)
  }
}

export const trackDownload = new TrackDownload({
  audiusBackend: audiusBackendInstance
})
