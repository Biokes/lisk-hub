export const CONTRACT_ADDRESSES = {
  liskSepolia: {
    gameToken: '0x5517fAa4744C9ca45aCE49964A1e4a347CBb5eaD',
    daoTreasury: '0x134d9021847517b79Ea3817bD560Cf39bc80A99A',
    gameHub: '0x3DB64cc0699E1af2988937a3E4fdA92E1A7Dc6d6',
    gameVault: '0x81EAaF9aCE8a9D69dfb821129017690f0Ec9EEd5',
    gameSettlement: '0xD13835a9dBd65B8f1b0D23B0127277E14863f282'
  }
} as const

export type NetworkName = keyof typeof CONTRACT_ADDRESSES

export const GAME_TOKEN_ADDRESS = CONTRACT_ADDRESSES.liskSepolia.gameToken
export const DAO_TREASURY_ADDRESS = CONTRACT_ADDRESSES.liskSepolia.daoTreasury
export const GAME_HUB_ADDRESS = CONTRACT_ADDRESSES.liskSepolia.gameHub
export const GAME_VAULT_ADDRESS = CONTRACT_ADDRESSES.liskSepolia.gameVault
export const GAME_SETTLEMENT_ADDRESS = CONTRACT_ADDRESSES.liskSepolia.gameSettlement

export const GAME_ADDRESSES = [
  {
    id: 'ping-pong',
    name: 'Ping Pong',
    description: 'Classic table tennis game with competitive gameplay',
    minDeposit: '0.01',
    maxDeposit: '1.0'
  },
  {
    id: 'poker',
    name: 'Poker',
    description: 'Traditional poker game with strategic betting',
    minDeposit: '0.05',
    maxDeposit: '5.0'
  }
] as const