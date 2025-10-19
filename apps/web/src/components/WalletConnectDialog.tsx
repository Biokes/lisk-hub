import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SiWalletconnect } from "react-icons/si";
import { Wallet, Check } from "lucide-react";

interface WalletConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect?: (address: string) => void;
}

export function WalletConnectDialog({ open, onOpenChange, onConnect }: WalletConnectDialogProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const handleConnect = (wallet: string) => {
    setConnecting(wallet);
    setTimeout(() => {
      setConnecting(null);
      setConnected(true);
      const mockAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
      onConnect?.(mockAddress);
      setTimeout(() => {
        onOpenChange(false);
        setConnected(false);
      }, 1000);
    }, 1500);
  };

  const walletOptions = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: Wallet,
      color: "text-orange-500",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: SiWalletconnect,
      color: "text-blue-500",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: Wallet,
      color: "text-blue-600",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-wallet-connect">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to Lisk Gaming Hub
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {walletOptions.map((wallet) => {
            const Icon = wallet.icon;
            const isConnecting = connecting === wallet.id;
            const isConnected = connected && connecting === wallet.id;

            return (
              <Button
                key={wallet.id}
                variant="outline"
                className="h-16 justify-start gap-4 text-lg hover-elevate active-elevate-2 relative overflow-hidden"
                onClick={() => handleConnect(wallet.id)}
                disabled={connecting !== null}
                data-testid={`button-wallet-${wallet.id}`}
              >
                {isConnecting && (
                  <div className="absolute inset-0 bg-primary/10 animate-pulse-glow" />
                )}
                {isConnected && (
                  <div className="absolute inset-0 bg-chart-3/20 animate-scale-in" />
                )}
                <Icon className={`h-8 w-8 ${wallet.color}`} />
                <span className="flex-1 text-left font-semibold">{wallet.name}</span>
                {isConnecting && (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                {isConnected && (
                  <Check className="h-5 w-5 text-chart-3 animate-scale-in" />
                )}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
