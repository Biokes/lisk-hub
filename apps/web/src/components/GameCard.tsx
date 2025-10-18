import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins, ArrowRight } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { GAME_VAULT_ADDRESS, GAME_VAULT_ABI } from "@/constants/contracts";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
  onPlay?: (gameId: string) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const { address } = useAccount();
  
  const { data: balance } = useReadContract({
    address: GAME_VAULT_ADDRESS as `0x${string}`,
    abi: GAME_VAULT_ABI,
    functionName: "getBalance",
    args: address ? [address, game.id as `0x${string}`] : undefined,
  });

  const gameBalance = balance ? Number(balance) / 1e18 : 0;

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer border border-card-border hover:border-primary/30"
      data-testid={`card-game-${game.id}`}
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-card to-card/70 border-b border-card-border">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-background/85 backdrop-blur-md border border-primary/20 text-foreground/90 font-medium">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            {game.playerCount}
          </Badge>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl font-display font-light text-primary/15 group-hover:text-primary/25 transition-colors duration-300">
            {game.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="space-y-2">
          <h3
            className="text-xl font-display font-semibold text-foreground tracking-tight"
            data-testid={`text-game-name-${game.id}`}
          >
            {game.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-card-border/0 via-card-border/50 to-card-border/0" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-chart-4/10 dark:bg-chart-4/15">
              <Coins className="h-4 w-4 text-chart-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium">
                Stake Range
              </p>
              <p className="text-base font-display font-semibold text-foreground">
                {game.minStake} - {game.maxStake} ETH
              </p>
            </div>
          </div>
        </div>

        {gameBalance > 0 && (
          <div className="p-3 rounded-lg bg-chart-3/10 border border-chart-3/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-chart-3">Your Balance:</span>
              <span className="font-mono font-semibold text-chart-3">{gameBalance.toFixed(4)} ETH</span>
            </div>
          </div>
        )}

        <Button
          className="w-full font-semibold py-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 group/btn mt-2"
          onClick={() => onPlay?.(game.id)}
          data-testid={`button-play-${game.id}`}
        >
          <span>{gameBalance > 0 ? 'Add More Stake' : 'Play Now'}</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
}