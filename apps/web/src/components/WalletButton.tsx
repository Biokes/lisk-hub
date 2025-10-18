import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, ExternalLink, LogOut } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDisconnect, useAccount, useBalance } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { liskSepolia } from "@/wallet/wagmi";

export function WalletButton() {
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    const balanceLabel = balance ? Number(balance.formatted).toFixed(4) : "0.0000";
    const explorerUrl = `${liskSepolia.blockExplorers?.default.url}/address/${address}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 rounded-full pl-2 pr-2.5 h-9 data-[state=open]:bg-accent"
            data-testid="button-wallet-connected"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-3.5 w-3.5 text-primary" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-sm">{formatAddress(address)}</span>
            <span className="text-muted-foreground text-xs">{balanceLabel} ETH</span>
            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-mono">{address}</DropdownMenuLabel>
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
