import { memo, useMemo, useState } from 'react'

import { useFeatureFlag } from '@audius/common/hooks'
import { FeatureFlags } from '@audius/common/services'
import { createDrawerNavigator } from '@react-navigation/drawer'
// eslint-disable-next-line import/no-unresolved
import type { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

import { AudioPlayer } from 'app/components/audio/AudioPlayer'
import { RNVideoAudioPlayer } from 'app/components/audio/RNVideoAudioPlayer'
import { RepeatListener } from 'app/components/audio/RepeatListener'

import { AppScreen } from '../app-screen'

import { AppDrawerContextProvider } from './AppDrawerContext'
import { LeftNavDrawer } from './left-nav-drawer'

const SCREEN_WIDTH = Dimensions.get('window').width

const Drawer = createDrawerNavigator()

type AppTabScreenProps = {
  navigation: DrawerNavigationHelpers
  gesturesDisabled: boolean
  setGesturesDisabled: (gesturesDisabled: boolean) => void
}

/**
 * The app stack after signing up or signing in
 */
const AppStack = memo(function AppStack(props: AppTabScreenProps) {
  const {
    navigation: drawerHelpers,
    gesturesDisabled,
    setGesturesDisabled
  } = props

  const drawerNavigation = useNavigation()

  return (
    <AppDrawerContextProvider
      drawerNavigation={drawerNavigation}
      drawerHelpers={drawerHelpers}
      gesturesDisabled={gesturesDisabled}
      setGesturesDisabled={setGesturesDisabled}
    >
      <AppScreen />
    </AppDrawerContextProvider>
  )
})

export const AppDrawerScreen = memo(
  () => {
    const [gesturesDisabled, setGesturesDisabled] = useState(false)

    const { isEnabled: useRNVideoPlayer } = useFeatureFlag(
      FeatureFlags.USE_RN_VIDEO_PLAYER
    )

    const drawerScreenOptions = useMemo(
      () => ({
        headerShown: false,
        swipeEdgeWidth: SCREEN_WIDTH,
        drawerType: 'slide' as const,
        drawerStyle: { width: '75%' as const },
        gestureHandlerProps: { enabled: !gesturesDisabled }
      }),
      [gesturesDisabled]
    )

    const gestureProps = { gesturesDisabled, setGesturesDisabled }

    return (
      <>
        <RepeatListener />
        {useRNVideoPlayer ? <RNVideoAudioPlayer /> : <AudioPlayer />}
        <Drawer.Navigator
          screenOptions={drawerScreenOptions}
          drawerContent={(props) => (
            <LeftNavDrawer {...gestureProps} {...props} />
          )}
        >
          <Drawer.Screen name='App'>
            {(props) => <AppStack {...props} {...gestureProps} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </>
    )
  },
  () => true
)
