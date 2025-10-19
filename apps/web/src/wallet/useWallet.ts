import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'

export function useWallet() {
  const { address, isConnecting } = useAccount()
  const { data: balanceData } = useBalance({ address })
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return {
    address,
    walletBalance: balanceData ? Number(balanceData.formatted) : undefined,
    isConnecting,
    connect: () => connect({ connector: connectors[0] }),
    disconnect,
  }
}


