import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  expect,
  it,
  describe,
  beforeAll,
  afterAll,
  afterEach,
  vitest
} from 'vitest'
import waitForExpect from 'wait-for-expect'

import { createAppWalletClient } from '../AudiusWalletClient'
import { DiscoveryNodeSelector } from '../DiscoveryNodeSelector'
import type { HealthCheckResponseData } from '../DiscoveryNodeSelector/healthCheckTypes'
import { Logger } from '../Logger'

import { StorageNodeSelector } from './StorageNodeSelector'

const storageNodeA = {
  endpoint: 'https://node-a.audius.co',
  delegateOwnerWallet: '0xc0ffee254729296a45a3885639AC7E10F9d54971'
}
const storageNodeB = {
  endpoint: 'https://node-b.audius.co',
  delegateOwnerWallet: '0xc0ffee254729296a45a3885639AC7E10F9d54972'
}

const userWallet = '0xc0ffee254729296a45a3885639AC7E10F9d54979'

const discoveryNode = 'https://discovery-provider.audius.co'

const audiusWalletClient = createAppWalletClient({ apiKey: userWallet })
const logger = new Logger()
const discoveryNodeSelector = new DiscoveryNodeSelector({
  initialSelectedNode: discoveryNode
})

const mswHandlers = [
  rest.get(`${discoveryNode}/health_check`, (_req, res, ctx) => {
    const data: HealthCheckResponseData = {
      service: 'discovery-node',
      version: '1.2.3',
      block_difference: 0,
      network: {
        discovery_nodes_with_owner: [
          { endpoint: discoveryNode, delegateOwnerWallet: '', ownerWallet: '' }
        ],
        content_nodes: [storageNodeA, storageNodeB]
      }
    }

    return res(
      ctx.status(200),
      ctx.json({
        data,
        comms: { healthy: true }
      })
    )
  }),

  rest.get(`${storageNodeA.endpoint}/health_check`, (_req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.get(`${storageNodeB.endpoint}/health_check`, (_req, res, ctx) => {
    return res(ctx.status(200))
  })
]

const server = setupServer(...mswHandlers)

describe('StorageNodeSelector', () => {
  beforeAll(() => {
    server.listen()
    vitest.spyOn(console, 'warn').mockImplementation(() => {})
    vitest.spyOn(console, 'info').mockImplementation(() => {})
    vitest.spyOn(console, 'debug').mockImplementation(() => {})
    vitest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('selects the correct endpoint given bootstrap nodes and user wallet', async () => {
    const bootstrapNodes = [storageNodeA, storageNodeB]

    const storageNodeSelector = new StorageNodeSelector({
      bootstrapNodes,
      audiusWalletClient,
      discoveryNodeSelector,
      logger
    })

    expect(await storageNodeSelector.getSelectedNode()).toEqual(
      storageNodeA.endpoint
    )
  })

  it('selects the first healthy node', async () => {
    server.use(
      rest.get(`${storageNodeA.endpoint}/health_check`, (_req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    const bootstrapNodes = [storageNodeA, storageNodeB]

    const storageNodeSelector = new StorageNodeSelector({
      bootstrapNodes,
      audiusWalletClient,
      discoveryNodeSelector,
      logger
    })

    expect(await storageNodeSelector.getSelectedNode()).toEqual(
      storageNodeB.endpoint
    )
  })

  it('selects correct storage node when discovery node already available', async () => {
    const discoveryNodeSelector = new DiscoveryNodeSelector({
      healthCheckThresholds: {
        minVersion: '1.2.3'
      },
      initialSelectedNode: discoveryNode
    })

    const storageNodeSelector = new StorageNodeSelector({
      discoveryNodeSelector,
      audiusWalletClient,
      logger
    })

    await waitForExpect(async () => {
      expect(await storageNodeSelector.getSelectedNode()).toEqual(
        storageNodeA.endpoint
      )
    })
  })

  it('selects correct storage node when discovery node is selected', async () => {
    const bootstrapDiscoveryNodes = [discoveryNode].map((endpoint) => ({
      endpoint,
      delegateOwnerWallet: '',
      ownerWallet: ''
    }))
    const discoveryNodeSelector = new DiscoveryNodeSelector({
      healthCheckThresholds: {
        minVersion: '1.2.3'
      },
      bootstrapServices: bootstrapDiscoveryNodes
    })

    const storageNodeSelector = new StorageNodeSelector({
      discoveryNodeSelector,
      audiusWalletClient,
      logger
    })

    await waitForExpect(async () => {
      expect(await storageNodeSelector.getSelectedNode()).toEqual(
        storageNodeA.endpoint
      )
    })
  })

  it('selects correct nodes when provided a cid', async () => {
    const bootstrapNodes = [storageNodeA, storageNodeB]
    const cid = 'QmNnuRwRWxrbWwE9ib9dvWVr4hLgcHGAJ8euys8WH5NgCX'

    const storageNodeSelector = new StorageNodeSelector({
      bootstrapNodes,
      audiusWalletClient,
      discoveryNodeSelector,
      logger
    })

    expect(await storageNodeSelector.getNodes(cid)).toEqual([
      storageNodeB.endpoint,
      storageNodeA.endpoint
    ])
  })

  it('force reselects successfully', async () => {
    const bootstrapNodes = [storageNodeA, storageNodeB]

    const storageNodeSelector = new StorageNodeSelector({
      bootstrapNodes,
      audiusWalletClient,
      discoveryNodeSelector,
      logger
    })

    expect(await storageNodeSelector.getSelectedNode()).toEqual(
      storageNodeA.endpoint
    )

    // force reselect
    expect(await storageNodeSelector.getSelectedNode(true)).toEqual(
      storageNodeB.endpoint
    )
  })

  it('tries selecting all nodes', async () => {
    server.use(
      rest.get(`${storageNodeA.endpoint}/health_check`, (_req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    server.use(
      rest.get(`${storageNodeB.endpoint}/health_check`, (_req, res, ctx) => {
        return res(ctx.status(400))
      })
    )
    const bootstrapNodes = [storageNodeA, storageNodeB]

    const storageNodeSelector = new StorageNodeSelector({
      bootstrapNodes,
      audiusWalletClient,
      discoveryNodeSelector,
      logger
    })

    expect(await storageNodeSelector.getSelectedNode()).toBe(null)
    expect(await storageNodeSelector.triedSelectingAllNodes()).toBe(true)
  })
})
