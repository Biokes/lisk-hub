import { useChainId, useSwitchChain, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react'
import { liskSepolia } from '@/wallet/wagmi'

const LISK_SEPOLIA_CHAIN_ID = 4202

const getNetworkName = (chainId: number): string => {
  const networkMap: Record<number, string> = {
    1: 'Ethereum Mainnet',
    11155111: 'Ethereum Sepolia',
    42220: 'Celo Mainnet',
    44787: 'Celo Alfajores Testnet',
    137: 'Polygon Mainnet',
    80001: 'Polygon Mumbai',
    56: 'BSC Mainnet',
    97: 'BSC Testnet',
    250: 'Fantom Opera',
    4002: 'Fantom Testnet',
    42161: 'Arbitrum One',
    421614: 'Arbitrum Sepolia',
    10: 'Optimism',
    420: 'Optimism Sepolia',
    8453: 'Base Mainnet',
    84532: 'Base Sepolia',
    43114: 'Avalanche C-Chain',
    43113: 'Avalanche Fuji',
    25: 'Cronos Mainnet',
    338: 'Cronos Testnet',
    100: 'Gnosis Chain',
    10200: 'Gnosis Chiado',
    1284: 'Moonbeam',
    1287: 'Moonbase Alpha',
    1285: 'Moonriver',
    592: 'Astar',
    336: 'Shibuya',
    128: 'Heco Mainnet',
    256: 'Heco Testnet',
    66: 'OKC Mainnet',
    65: 'OKC Testnet',
    1666600000: 'Harmony Mainnet',
    1666700000: 'Harmony Testnet',
    30: 'RSK Mainnet',
    31: 'RSK Testnet',
    8217: 'Klaytn Mainnet',
    1001: 'Klaytn Baobab',
    108: 'ThunderCore Mainnet',
    18: 'ThunderCore Testnet',
  }
  return networkMap[chainId] || `Chain ID: ${chainId}`
}

export default function NetworkGuard({ children }: { children: React.ReactNode }) {
  const chainId = useChainId()
  const { switchChain, isPending, error: switchError } = useSwitchChain()
  const { isConnected } = useAccount()

  if (isConnected && chainId && chainId !== LISK_SEPOLIA_CHAIN_ID) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center space-y-6 p-8 border rounded-lg bg-card">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Wrong Network</h2>
              <p className="text-muted-foreground">
                Please switch to <strong>Lisk Sepolia</strong> to use Lisk Gaming Hub.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">Current Network:</p>
                <p className="font-mono text-sm font-semibold text-destructive">
                  {getNetworkName(chainId)}
                </p>
              </div>

              {switchError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">
                    Failed to switch network: {switchError.message}
                  </p>
                </div>
              )}

              <Button
                onClick={() => switchChain({ chainId: LISK_SEPOLIA_CHAIN_ID })}
                disabled={isPending}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Switching Network...
                  </>
                ) : (
                  'Switch to Lisk Sepolia'
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Lisk Sepolia Chain ID: <span className="font-mono">4202</span></p>
              <p>RPC: <span className="font-mono break-all">{liskSepolia.rpcUrls.default.http[0]}</span></p>
              <p>Explorer: <a href={liskSepolia.blockExplorers?.default.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                <span className="font-mono break-all">{liskSepolia.blockExplorers?.default.url}</span>
                <ExternalLink className="h-3 w-3" />
              </a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}


