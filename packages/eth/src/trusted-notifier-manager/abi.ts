export const abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_governanceAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_initialNotifierWallet',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_initialNotiferEndpoint',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_initialNotiferEmail',
        type: 'string'
      }
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_wallet',
        type: 'address'
      },
      {
        internalType: 'string',
        name: '_endpoint',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_email',
        type: 'string'
      }
    ],
    name: 'registerNotifier',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_wallet',
        type: 'address'
      }
    ],
    name: 'deregisterNotifier',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getLatestNotifierID',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: '_ID',
        type: 'uint256'
      }
    ],
    name: 'getNotifierForID',
    outputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'endpoint',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_wallet',
        type: 'address'
      }
    ],
    name: 'getNotifierForWallet',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ID',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'endpoint',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '_endpoint',
        type: 'string'
      }
    ],
    name: 'getNotifierForEndpoint',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ID',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: '_email',
        type: 'string'
      }
    ],
    name: 'getNotifierForEmail',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ID',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address'
      },
      {
        internalType: 'string',
        name: 'endpoint',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getGovernanceAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_governanceAddress',
        type: 'address'
      }
    ],
    name: 'setGovernanceAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const
