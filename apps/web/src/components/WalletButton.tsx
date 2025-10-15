import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { WalletConnectDialog } from "./WalletConnectDialog";

interface WalletButtonProps {
  address?: string;
  balance?: number;
  onConnect?: (address: string) => void;
}

export function WalletButton({ address, balance, onConnect }: WalletButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    return (
      <Button
        variant="outline"
        className="gap-2 font-mono"
        data-testid="button-wallet-connected"
      >
        <Wallet className="h-4 w-4" />
        <span>{formatAddress(address)}</span>
        <span className="text-primary font-semibold">{balance} GCT</span>
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="gap-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        data-testid="button-connect-wallet"
      >
        <Wallet className="h-4 w-4" />
        <span className="font-semibold">Connect Wallet</span>
      </Button>
      <WalletConnectDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onConnect={onConnect}
      />
    </>
  );
}
