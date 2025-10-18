// Contract addresses
export const GAME_VAULT_ADDRESS = "0x81EAaF9aCE8a9D69dfb821129017690f0Ec9EEd5" as const;
export const GAME_SETTLEMENT_ADDRESS = "0xD13835a9dBd65B8f1b0D23B0127277E14863f282" as const;
export const GAME_TOKEN_ADDRESS = "0x5517fAa4744C9ca45aCE49964A1e4a347CBb5eaD" as const;

// Contract ABIs - simplified versions for the frontend
export const GAME_VAULT_ABI = [
  {
    "type": "function",
    "name": "getBalance",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "gameId",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
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
