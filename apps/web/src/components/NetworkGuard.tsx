import { useChainId, useSwitchChain } from 'wagmi'
import { liskSepolia } from '@/wallet/wagmi'

export default function NetworkGuard({ children }: { children: React.ReactNode }) {
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  if (chainId && chainId !== liskSepolia.id) {
    return (
      <div className="p-4 border rounded-md">
        <p className="mb-2">Wrong network. Please switch to Lisk Sepolia.</p>
        <button
          className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-50"
          onClick={() => switchChain({ chainId: liskSepolia.id })}
          disabled={isPending}
        >
          {isPending ? 'Switching...' : 'Switch to Lisk Sepolia'}
        </button>
      </div>
    )
  }

  return <>{children}</>
}


