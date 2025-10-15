import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, AlertCircle } from "lucide-react";
import type { Game } from "@shared/schema";

interface StakingDialogProps {
  game: Game | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletBalance?: number;
  onConfirmStake?: (gameId: string, amount: number) => void;
}

const RISK_PRESETS: { id: "low" | "medium" | "high"; label: string; multiplier: number }[] = [
  { id: "low", label: "Low", multiplier: 1.5 },
  { id: "medium", label: "Medium", multiplier: 1.8 },
  { id: "high", label: "High", multiplier: 2.2 },
];

const FIXED_STAKES = [10, 25, 50, 100, 250, 500];

export function StakingDialog({
  game,
  open,
  onOpenChange,
  walletBalance = 0,
  onConfirmStake,
}: StakingDialogProps) {
  const [stakeAmount, setStakeAmount] = useState<number | null>(null);
  const [risk, setRisk] = useState<typeof RISK_PRESETS[number]>(RISK_PRESETS[0]);
  const [isStaking, setIsStaking] = useState(false);

  if (!game) return null;

  const platformFee = (stakeAmount ?? 0) * 0.05;
  const potentialWin = (stakeAmount ?? 0) * risk.multiplier - platformFee;

  const handleStake = () => {
    if (!stakeAmount) return;
    setIsStaking(true);
    setTimeout(() => {
      onConfirmStake?.(game.id, stakeAmount);
      setIsStaking(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-staking">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{game.name}</DialogTitle>
          <DialogDescription>
            Select a fixed stake and risk level to enter the game
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
            <span>Balance: {walletBalance} ETH</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {FIXED_STAKES.map((amount) => (
              <Button
                key={amount}
                variant={stakeAmount === amount ? "default" : "outline"}
                className="h-10 font-mono"
                onClick={() => setStakeAmount(amount)}
                disabled={amount > walletBalance}
                data-testid={`stake-${amount}`}
              >
                {amount}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            {RISK_PRESETS.map((r) => (
              <Button
                key={r.id}
                variant={risk.id === r.id ? "default" : "outline"}
                onClick={() => setRisk(r)}
                className="h-10"
                data-testid={`risk-${r.id}`}
              >
                {r.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                Risk Level
              </div>
              <Badge>{risk.label}</Badge>
            </Card>
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3" />
                Platform Fee
              </div>
              <p className="font-mono font-semibold">{platformFee.toFixed(4)} ETH</p>
            </Card>
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                Potential Win
              </div>
              <p className="font-mono font-semibold text-chart-3">{potentialWin.toFixed(4)} ETH</p>
            </Card>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold relative"
            onClick={handleStake}
            disabled={isStaking || !stakeAmount || stakeAmount > walletBalance}
            data-testid="button-confirm-stake"
          >
            {isStaking ? "Confirming Stake..." : "Confirm Stake"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-md border bg-card ${className}`}>{children}</div>;
}
