import { createConfig, http } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { defineChain } from 'viem'

export const liskSepolia = defineChain({
  id: 4202,
  name: 'Lisk Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.sepolia-api.lisk.com'] } },
  blockExplorers: { default: { name: 'Blockscout', url: 'https://sepolia-blockscout.lisk.com' } },
  testnet: true,
})

export function makeConfig(projectId: string) {
  return createConfig({
    chains: [liskSepolia],
    transports: { [liskSepolia.id]: http('https://rpc.sepolia-api.lisk.com') },
    connectors: [injected(), walletConnect({ projectId, showQrModal: true })],
    ssr: false,
  })
}


