import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChainId, useAccount } from "wagmi";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { liskSepolia } from "@/wallet/wagmi";

const LISK_SEPOLIA_CHAIN_ID = 4202;

const getNetworkInfo = (chainId: number) => {
  const networkMap: Record<number, { name: string; color: string; icon: React.ReactNode }> = {
    1: { name: 'Ethereum', color: 'bg-blue-500', icon: <Wifi className="h-3 w-3" /> },
    11155111: { name: 'Ethereum Sepolia', color: 'bg-blue-400', icon: <Wifi className="h-3 w-3" /> },
    42220: { name: 'Celo', color: 'bg-green-500', icon: <Wifi className="h-3 w-3" /> },
    44787: { name: 'Celo Alfajores', color: 'bg-green-400', icon: <Wifi className="h-3 w-3" /> },
    137: { name: 'Polygon', color: 'bg-purple-500', icon: <Wifi className="h-3 w-3" /> },
    80001: { name: 'Polygon Mumbai', color: 'bg-purple-400', icon: <Wifi className="h-3 w-3" /> },
    56: { name: 'BSC', color: 'bg-yellow-500', icon: <Wifi className="h-3 w-3" /> },
    97: { name: 'BSC Testnet', color: 'bg-yellow-400', icon: <Wifi className="h-3 w-3" /> },
    250: { name: 'Fantom', color: 'bg-cyan-500', icon: <Wifi className="h-3 w-3" /> },
    4002: { name: 'Fantom Testnet', color: 'bg-cyan-400', icon: <Wifi className="h-3 w-3" /> },
    42161: { name: 'Arbitrum', color: 'bg-blue-600', icon: <Wifi className="h-3 w-3" /> },
    421614: { name: 'Arbitrum Sepolia', color: 'bg-blue-500', icon: <Wifi className="h-3 w-3" /> },
    10: { name: 'Optimism', color: 'bg-red-500', icon: <Wifi className="h-3 w-3" /> },
    420: { name: 'Optimism Sepolia', color: 'bg-red-400', icon: <Wifi className="h-3 w-3" /> },
    8453: { name: 'Base', color: 'bg-blue-500', icon: <Wifi className="h-3 w-3" /> },
    84532: { name: 'Base Sepolia', color: 'bg-blue-400', icon: <Wifi className="h-3 w-3" /> },
    43114: { name: 'Avalanche', color: 'bg-red-600', icon: <Wifi className="h-3 w-3" /> },
    43113: { name: 'Avalanche Fuji', color: 'bg-red-500', icon: <Wifi className="h-3 w-3" /> },
    25: { name: 'Cronos', color: 'bg-purple-600', icon: <Wifi className="h-3 w-3" /> },
    338: { name: 'Cronos Testnet', color: 'bg-purple-500', icon: <Wifi className="h-3 w-3" /> },
    100: { name: 'Gnosis', color: 'bg-teal-500', icon: <Wifi className="h-3 w-3" /> },
    10200: { name: 'Gnosis Chiado', color: 'bg-teal-400', icon: <Wifi className="h-3 w-3" /> },
    1284: { name: 'Moonbeam', color: 'bg-pink-500', icon: <Wifi className="h-3 w-3" /> },
    1287: { name: 'Moonbase Alpha', color: 'bg-pink-400', icon: <Wifi className="h-3 w-3" /> },
    1285: { name: 'Moonriver', color: 'bg-pink-600', icon: <Wifi className="h-3 w-3" /> },
    592: { name: 'Astar', color: 'bg-indigo-500', icon: <Wifi className="h-3 w-3" /> },
    336: { name: 'Shibuya', color: 'bg-indigo-400', icon: <Wifi className="h-3 w-3" /> },
    4202: { name: 'Lisk Sepolia', color: 'bg-emerald-500', icon: <Wifi className="h-3 w-3" /> },
  };
  
  return networkMap[chainId] || { 
    name: `Chain ${chainId}`, 
    color: 'bg-gray-500', 
    icon: <Wifi className="h-3 w-3" /> 
  };
};

export function NetworkIndicator() {
  const chainId = useChainId();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="gap-1.5 px-2 py-1">
        <WifiOff className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Not Connected</span>
      </Badge>
    );
  }

  if (!chainId) {
    return (
      <Badge variant="outline" className="gap-1.5 px-2 py-1">
        <WifiOff className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Unknown Network</span>
      </Badge>
    );
  }

  const networkInfo = getNetworkInfo(chainId);
  const isCorrectNetwork = chainId === LISK_SEPOLIA_CHAIN_ID;

  return (
    <Badge 
      variant={isCorrectNetwork ? "default" : "destructive"} 
      className={`gap-1.5 px-2 py-1 ${isCorrectNetwork ? '' : 'border-destructive'}`}
    >
      {isCorrectNetwork ? (
        <>
          <div className={`h-2 w-2 rounded-full ${networkInfo.color}`} />
          <span className="text-xs font-medium">{networkInfo.name}</span>
        </>
      ) : (
        <>
          <AlertTriangle className="h-3 w-3" />
          <span className="text-xs font-medium">{networkInfo.name}</span>
        </>
      )}
    </Badge>
  );
}
