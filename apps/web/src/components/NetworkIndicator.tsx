import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useChainId, useAccount } from "wagmi";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { liskSepolia } from "@/wallet/wagmi";

const LISK_SEPOLIA_CHAIN_ID = 4202;

const getNetworkInfo = (chainId: number) => {
  if (chainId === LISK_SEPOLIA_CHAIN_ID) {
    return { 
      name: 'Lisk Sepolia', 
      color: 'bg-emerald-500', 
      icon: <Wifi className="h-3 w-3" /> 
    };
  }
  
  return { 
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
