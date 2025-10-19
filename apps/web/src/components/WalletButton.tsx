import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, ExternalLink, LogOut } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDisconnect, useAccount, useBalance, useReadContract, useChainId } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { liskSepolia } from "@/wallet/wagmi";
import { GAME_TOKEN_ADDRESS } from "@/constants/contracts";

const LISK_SEPOLIA_CHAIN_ID = 4202

export function WalletButton() {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: ethBalance } = useBalance({ 
    address,
    chainId: LISK_SEPOLIA_CHAIN_ID // Only fetch balance on correct network
  });
  
  const { data: tokenBalance } = useReadContract({
    address: GAME_TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: LISK_SEPOLIA_CHAIN_ID, // Only fetch on correct network
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    const ethBalanceLabel = ethBalance ? Number(ethBalance.formatted).toFixed(4) : "0.0000";
    const tokenBalanceLabel = tokenBalance ? (Number(tokenBalance) / 1e18).toFixed(2) : "0.00";
    const explorerUrl = `${liskSepolia.blockExplorers?.default.url}/address/${address}`;
    
    // Show network indicator if on wrong network
    const isWrongNetwork = chainId && chainId !== LISK_SEPOLIA_CHAIN_ID;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`gap-2 rounded-full pl-2 pr-2.5 h-9 data-[state=open]:bg-accent ${
              isWrongNetwork ? 'border-destructive bg-destructive/10' : ''
            }`}
            data-testid="button-wallet-connected"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-3.5 w-3.5 text-primary" />
              <span className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${
                isWrongNetwork ? 'bg-destructive' : 'bg-emerald-500'
              }`} />
            </span>
            <span className="font-mono text-sm">{formatAddress(address)}</span>
            <span className="text-muted-foreground text-xs">
              {tokenBalanceLabel} GAME
            </span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-mono">{address}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ETH:</span>
              <span className="font-mono">{ethBalanceLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GAME:</span>
              <span className="font-mono">{tokenBalanceLabel}</span>
            </div>
            {isWrongNetwork && (
              <div className="mt-2 pt-2 border-t border-destructive/20">
                <p className="text-xs text-destructive font-medium">Wrong Network</p>
                <p className="text-xs text-destructive">Switch to Lisk Sepolia</p>
              </div>
            )}
          </div>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href={explorerUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View on Explorer
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()} className="text-destructive">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() => openConnectModal?.()}
      className="gap-2 rounded-full h-9 px-4 bg-primary text-primary-foreground hover:opacity-90"
      data-testid="button-connect-wallet"
    >
      <Wallet className="h-4 w-4" />
      <span className="font-medium">Connect Wallet</span>
    </Button>
  );
}
