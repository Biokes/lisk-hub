import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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

export function StakingDialog({
  game,
  open,
  onOpenChange,
  walletBalance = 1250,
  onConfirmStake,
}: StakingDialogProps) {
  const [stakeAmount, setStakeAmount] = useState(game?.minStake || 0);
  const [isStaking, setIsStaking] = useState(false);

  if (!game) return null;

  const platformFee = stakeAmount * 0.05;
  const potentialWin = stakeAmount * 2 - platformFee;
  const riskLevel = stakeAmount > 500 ? "High" : stakeAmount > 100 ? "Medium" : "Low";
  const riskColor = riskLevel === "High" ? "destructive" : riskLevel === "Medium" ? "chart-4" : "chart-3";

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      onConfirmStake?.(game.id, stakeAmount);
      setIsStaking(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-staking">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{game.name}</DialogTitle>
          <DialogDescription>
            Set your stake amount and confirm to enter the game
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="stake-amount" className="text-base">Stake Amount</Label>
              <span className="text-sm text-muted-foreground font-mono">
                Balance: {walletBalance} GCT
              </span>
            </div>
            <div className="relative">
              <Input
                id="stake-amount"
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                min={game.minStake}
                max={Math.min(game.maxStake, walletBalance)}
                className="text-2xl font-mono h-14 pr-16"
                data-testid="input-stake-amount"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                GCT
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Slider
              value={[stakeAmount]}
              onValueChange={(value) => setStakeAmount(value[0])}
              min={game.minStake}
              max={Math.min(game.maxStake, walletBalance)}
              step={10}
              className="py-4"
              data-testid="slider-stake-amount"
            />
            <div className="flex justify-between gap-2 text-xs text-muted-foreground font-mono">
              <span>{game.minStake} GCT</span>
              <span>{Math.min(game.maxStake, walletBalance)} GCT</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                Risk Level
              </div>
              <Badge className={`bg-${riskColor}/20 text-${riskColor} border-${riskColor}/20`}>
                {riskLevel}
              </Badge>
            </Card>
            
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3" />
                Platform Fee
              </div>
              <p className="font-mono font-semibold">{platformFee.toFixed(0)} GCT</p>
            </Card>
            
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                Potential Win
              </div>
              <p className="font-mono font-semibold text-chart-3">{potentialWin.toFixed(0)} GCT</p>
            </Card>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold relative"
            onClick={handleStake}
            disabled={isStaking || stakeAmount < game.minStake || stakeAmount > walletBalance}
            data-testid="button-confirm-stake"
          >
            {isStaking && (
              <>
                <div className="absolute inset-0 bg-primary/10" />
                <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              </>
            )}
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
