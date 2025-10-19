import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { defineChain } from 'viem'

const rpcUrl = import.meta.env.VITE_LISK_RPC_URL || 'https://rpc.sepolia-api.lisk.com'
const chainId = Number(import.meta.env.VITE_LISK_CHAIN_ID) || 4202
const blockExplorer = import.meta.env.VITE_LISK_BLOCK_EXPLORER || 'https://sepolia-blockscout.lisk.com'

export const liskSepolia = defineChain({
  id: chainId,
  name: 'Lisk Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [rpcUrl] } },
  blockExplorers: { default: { name: 'Blockscout', url: blockExplorer } },
  testnet: true,
})

export function makeConfig(projectId: string) {
  return createConfig({
    chains: [liskSepolia],
    transports: { [liskSepolia.id]: http(rpcUrl) },
    connectors: [injected(), walletConnect({ projectId, showQrModal: true })],
    ssr: false,
  })
}


