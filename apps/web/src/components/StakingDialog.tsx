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
import { Coins, AlertCircle } from "lucide-react";
import { useAccount, useBalance, useWriteContract, useReadContract } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { GAME_TOKEN_ADDRESS, GAME_VAULT_ADDRESS, GAME_VAULT_ABI } from "@/constants/contracts";
import { calculateFee } from "@/utils/fee";
import type { Game } from "@shared/schema";

interface StakingDialogProps {
  game: Game | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmStake?: (gameId: string, amount: number) => void;
}

export function StakingDialog({
  game,
  open,
  onOpenChange,
  onConfirmStake,
}: StakingDialogProps) {
  const [isStaking, setIsStaking] = useState(false);
  
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { writeContract } = useWriteContract();
  const { toast } = useToast();

  const fixedDeposit = game ? parseFloat(game.minStake.toString()) : 0;

  const { data: allowance } = useReadContract({
    address: GAME_TOKEN_ADDRESS as `0x${string}`,
    abi: [
      {
        inputs: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "allowance",
    args: address ? [address, GAME_VAULT_ADDRESS as `0x${string}`] : undefined,
  });

  if (!game) return null;

  const walletBalance = balance ? Number(balance.formatted) : 0;
  const platformFee = parseFloat(calculateFee(fixedDeposit.toString(), "0.05"));
  const hasEnoughAllowance = allowance && fixedDeposit ? Number(allowance) >= fixedDeposit * 1e18 : false;

  const handleStake = async () => {
    if (!address) return;
    
    setIsStaking(true);
    
    try {
      if (!hasEnoughAllowance) {
        toast({
          title: "Approving tokens...",
          description: "Please approve the contract to spend your tokens",
        });
        
        await writeContract({
          address: GAME_TOKEN_ADDRESS as `0x${string}`,
          abi: [
            {
              inputs: [
                { name: "spender", type: "address" },
                { name: "amount", type: "uint256" }
              ],
              name: "approve",
              outputs: [{ name: "", type: "bool" }],
              stateMutability: "nonpayable",
              type: "function"
            }
          ],
          functionName: "approve",
          args: [GAME_VAULT_ADDRESS as `0x${string}`, BigInt(fixedDeposit * 1e18)],
        });
        
        toast({
          title: "Approval successful",
          description: "Now depositing to the game...",
        });
      }
      
      await writeContract({
        address: GAME_VAULT_ADDRESS as `0x${string}`,
        abi: GAME_VAULT_ABI,
        functionName: "deposit",
        args: [GAME_TOKEN_ADDRESS as `0x${string}`, BigInt(fixedDeposit * 1e18)],
      });
      
      toast({
        title: "Stake successful!",
        description: `Successfully staked ${fixedDeposit} tokens`,
      });
      
      onConfirmStake?.(game.id, fixedDeposit);
      onOpenChange(false);
      
    } catch (error) {
      toast({
        title: "Stake failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-staking">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{game.name}</DialogTitle>
          <DialogDescription>
            Enter the game with a fixed deposit amount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
            <span>Balance: {walletBalance.toFixed(4)} ETH</span>
            <span>Fixed Deposit: {fixedDeposit.toFixed(4)} ETH</span>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Required Deposit</p>
              <p className="text-2xl font-display font-bold text-primary">{fixedDeposit.toFixed(4)} ETH</p>
              <p className="text-xs text-muted-foreground">Fixed amount for fairness</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3" />
                Platform Fee
              </div>
              <p className="font-mono font-semibold">{platformFee.toFixed(4)} ETH</p>
            </Card>
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                Net Deposit
              </div>
              <p className="font-mono font-semibold text-chart-3">{(fixedDeposit - platformFee).toFixed(4)} ETH</p>
            </Card>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold relative"
            onClick={handleStake}
            disabled={isStaking || fixedDeposit > walletBalance || !address}
            data-testid="button-confirm-stake"
          >
            {isStaking ? "Processing..." : !hasEnoughAllowance ? "Approve & Stake" : "Confirm Stake"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-md border bg-card ${className}`}>{children}</div>;
}
