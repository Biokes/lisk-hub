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
import { useAccount, useBalance, useWriteContract, useReadContract, useSimulateContract, useEstimateGas } from "wagmi";
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
  const { data: ethBalance } = useBalance({ address });
  
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
  });
  
  const { writeContract } = useWriteContract();
  const { toast } = useToast();

  const fixedDeposit = game ? parseFloat(game.minStake.toString()) : 0;
  const depositAmountBigInt = BigInt(Math.floor(fixedDeposit * 1e18));
  const { fee, net } = calculateFee(depositAmountBigInt, 2);

  const { data: approvalSimulation, error: approvalError } = useSimulateContract({
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
    args: [GAME_VAULT_ADDRESS as `0x${string}`, depositAmountBigInt],
    query: {
      enabled: !!address && !!depositAmountBigInt,
    },
  });

  const { data: stakeSimulation, error: stakeError } = useSimulateContract({
    address: GAME_VAULT_ADDRESS as `0x${string}`,
    abi: GAME_VAULT_ABI,
    functionName: "deposit",
    args: game ? [game.id as `0x${string}`, depositAmountBigInt] : undefined,
    query: {
      enabled: !!address && !!game && !!depositAmountBigInt,
    },
  });

  const { data: gasEstimate } = useEstimateGas({
    to: GAME_VAULT_ADDRESS as `0x${string}`,
    data: stakeSimulation?.request?.data,
    query: {
      enabled: !!stakeSimulation?.request?.data,
    },
  });

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

  const walletTokenBalance = tokenBalance ? Number(tokenBalance) / 1e18 : 0;
  const platformFee = Number(fee) / 1e18;
  const netDeposit = Number(net) / 1e18;
  const hasEnoughAllowance = allowance && depositAmountBigInt ? allowance >= depositAmountBigInt : false;
  
  const ethBalanceWei = ethBalance?.value || BigInt(0);
  const gasEstimateWei = gasEstimate || BigInt(0);
  const hasEnoughEth = ethBalanceWei >= gasEstimateWei;
  
  const getErrorMessage = (error: any): string => {
    if (!error) return "Unknown error occurred";
    
    const message = error.message || error.toString();
    
    if (message.includes("insufficient allowance")) {
      return "Insufficient token allowance. Please approve more tokens.";
    }
    if (message.includes("insufficient balance")) {
      return "Insufficient token balance. Please get more tokens.";
    }
    if (message.includes("game not active")) {
      return "This game is no longer active.";
    }
    if (message.includes("zero amount")) {
      return "Cannot stake zero amount.";
    }
    if (message.includes("insufficient funds")) {
      return "Insufficient ETH for gas fees.";
    }
    if (message.includes("user rejected")) {
      return "Transaction was rejected by user.";
    }
    if (message.includes("network")) {
      return "Network error. Please check your connection.";
    }
    
    return message;
  };

  const canApprove = !hasEnoughAllowance && !approvalError && approvalSimulation;
  const canStake = hasEnoughAllowance && !stakeError && stakeSimulation && hasEnoughEth;
  const hasSimulationErrors = approvalError || stakeError;

  const validateTransaction = (): { isValid: boolean; error?: string } => {
    if (!address) {
      return { isValid: false, error: "Wallet not connected" };
    }
    
    if (!game) {
      return { isValid: false, error: "No game selected" };
    }
    
    if (fixedDeposit <= 0) {
      return { isValid: false, error: "Invalid deposit amount" };
    }
    
    if (walletTokenBalance < fixedDeposit) {
      return { isValid: false, error: "Insufficient token balance" };
    }
    
    if (!hasEnoughEth) {
      return { isValid: false, error: "Insufficient ETH for gas fees" };
    }
    
    if (hasSimulationErrors) {
      return { isValid: false, error: getErrorMessage(approvalError || stakeError) };
    }
    
    if (!hasEnoughAllowance && !canApprove) {
      return { isValid: false, error: "Cannot approve tokens" };
    }
    
    if (hasEnoughAllowance && !canStake) {
      return { isValid: false, error: "Cannot stake tokens" };
    }
    
    return { isValid: true };
  };

  const handleStake = async () => {
    const validation = validateTransaction();
    if (!validation.isValid) {
      toast({
        title: "Cannot proceed",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }
    
    setIsStaking(true);
    
    try {
      if (!hasEnoughAllowance) {
        if (!canApprove) {
          toast({
            title: "Cannot approve",
            description: getErrorMessage(approvalError),
            variant: "destructive",
          });
          return;
        }
        
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
          args: [GAME_VAULT_ADDRESS as `0x${string}`, depositAmountBigInt],
        });
        
        toast({
          title: "Approval successful",
          description: "Now depositing to the game...",
        });
      }
      
      if (!canStake) {
        toast({
          title: "Cannot stake",
          description: getErrorMessage(stakeError),
          variant: "destructive",
        });
        return;
      }
      
      await writeContract({
        address: GAME_VAULT_ADDRESS as `0x${string}`,
        abi: GAME_VAULT_ABI,
        functionName: "deposit",
        args: [game.id as `0x${string}`, depositAmountBigInt],
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
        description: getErrorMessage(error),
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
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
              <span>Token Balance: {walletTokenBalance.toFixed(4)} GAME</span>
              <span>Fixed Deposit: {fixedDeposit.toFixed(4)} GAME</span>
            </div>
            
            {gasEstimate && (
              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Estimated Gas: {(Number(gasEstimate) / 1e18).toFixed(6)} ETH</span>
                <span className={hasEnoughEth ? "text-green-600" : "text-red-600"}>
                  {hasEnoughEth ? "✓ Sufficient ETH" : "✗ Insufficient ETH"}
                </span>
              </div>
            )}
            
            {hasSimulationErrors && (
              <div className="text-xs text-red-600 font-mono">
                ⚠️ {getErrorMessage(approvalError || stakeError)}
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Required Deposit</p>
              <p className="text-2xl font-display font-bold text-primary">{fixedDeposit.toFixed(4)} GAME</p>
              <p className="text-xs text-muted-foreground">Fixed amount for fairness</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Coins className="h-3 w-3" />
                Platform Fee (2%)
              </div>
              <p className="font-mono font-semibold">{platformFee.toFixed(4)} GAME</p>
            </Card>
            <Card className="p-3 space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3 w-3" />
                Net Deposit
              </div>
              <p className="font-mono font-semibold text-chart-3">{netDeposit.toFixed(4)} GAME</p>
            </Card>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold relative"
            onClick={handleStake}
            disabled={isStaking || !validateTransaction().isValid}
            data-testid="button-confirm-stake"
          >
            {(() => {
              if (isStaking) return "Processing...";
              
              const validation = validateTransaction();
              if (!validation.isValid) {
                if (validation.error?.includes("balance")) return "Insufficient balance";
                if (validation.error?.includes("ETH")) return "Insufficient ETH";
                if (validation.error?.includes("simulation")) return "Transaction will fail";
                return "Cannot proceed";
              }
              
              return !hasEnoughAllowance ? "Approve & Stake" : "Confirm Stake";
            })()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-md border bg-card ${className}`}>{children}</div>;
}
