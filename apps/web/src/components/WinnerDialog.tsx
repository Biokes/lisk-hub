import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Coins, TrendingUp, Sparkles } from "lucide-react";
import type { GameResult } from "@shared/schema";

interface WinnerDialogProps {
  result: GameResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClaim?: () => void;
}

export function WinnerDialog({ result, open, onOpenChange, onClaim }: WinnerDialogProps) {
  const [animatedPrize, setAnimatedPrize] = useState(0);

  useEffect(() => {
    if (open && result) {
      let start = 0;
      const end = result.prize;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedPrize(end);
          clearInterval(timer);
        } else {
          setAnimatedPrize(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [open, result]);

  if (!result) return null;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden" data-testid="dialog-winner">
        <div className="absolute inset-0 pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="h-20 w-20 text-chart-4 animate-float" />
              <Sparkles className="h-6 w-6 text-chart-3 absolute -top-2 -right-2 animate-pulse-glow" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-display text-center">
            Victory!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Congratulations on your win
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 relative z-10">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Winner</p>
            <Badge className="text-base font-mono px-4 py-1" data-testid="text-winner-address">
              {formatAddress(result.winner)}
            </Badge>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Prize Amount</p>
            <div className="flex items-center justify-center gap-2">
              <Coins className="h-8 w-8 text-chart-4" />
              <span className="text-5xl font-display font-bold text-chart-3 font-mono" data-testid="text-prize-amount">
                {animatedPrize}
              </span>
              <span className="text-2xl text-muted-foreground font-mono">GCT</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-md border bg-card space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                Total Pot
              </div>
              <p className="font-mono font-semibold text-lg">
                {result.prize + result.platformFee} GCT
              </p>
            </div>
            
            <div className="p-4 rounded-md border bg-card space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3" />
                Platform Fee
              </div>
              <p className="font-mono font-semibold text-lg text-muted-foreground">
                {result.platformFee} GCT
              </p>
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            onClick={() => {
              onClaim?.();
              onOpenChange(false);
            }}
            data-testid="button-claim-rewards"
          >
            <Trophy className="h-5 w-5 mr-2" />
            Claim Rewards
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
