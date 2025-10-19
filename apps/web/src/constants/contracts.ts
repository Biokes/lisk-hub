// Contract addresses - sourced from SDK but hardcoded for frontend
export const GAME_TOKEN_ADDRESS = "0x5517fAa4744C9ca45aCE49964A1e4a347CBb5eaD" as const;
export const DAO_TREASURY_ADDRESS = "0x134d9021847517b79Ea3817bD560Cf39bc80A99A" as const;
export const GAME_HUB_ADDRESS = "0x3DB64cc0699E1af2988937a3E4fdA92E1A7Dc6d6" as const;
export const GAME_VAULT_ADDRESS = "0x81EAaF9aCE8a9D69dfb821129017690f0Ec9EEd5" as const;
export const GAME_SETTLEMENT_ADDRESS = "0xD13835a9dBd65B8f1b0D23B0127277E14863f282" as const;

export const CONTRACT_ADDRESSES = {
  gameToken: GAME_TOKEN_ADDRESS,
  daoTreasury: DAO_TREASURY_ADDRESS,
  gameHub: GAME_HUB_ADDRESS,
  gameVault: GAME_VAULT_ADDRESS,
  gameSettlement: GAME_SETTLEMENT_ADDRESS
} as const;

export const GAME_VAULT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "player", "type": "address"},
      {"internalType": "address", "name": "game", "type": "address"}
    ],
    "name": "getBalance",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "game", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const GAME_SETTLEMENT_ABI = [
  {
    "type": "event",
    "name": "GameSettled",
    "inputs": [
      {
        "name": "matchId",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "game",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "winner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;
