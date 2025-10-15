import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Coins } from "lucide-react";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
  onPlay?: (gameId: string) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer border-card-border"
      data-testid={`card-game-${game.id}`}
    >
      <div className="relative h-48 overflow-hidden bg-card/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="absolute top-3 right-3">
          <Badge className="bg-background/80 backdrop-blur-sm border-primary/20">
            <Users className="h-3 w-3 mr-1" />
            {game.playerCount}
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-display text-primary/20 group-hover:text-primary/30 transition-colors">
            {game.name.charAt(0)}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-display font-semibold mb-2" data-testid={`text-game-name-${game.id}`}>
            {game.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {game.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Coins className="h-4 w-4 text-chart-4" />
          <span className="text-muted-foreground">Stake:</span>
          <span className="font-mono font-semibold text-foreground">
            {game.minStake} - {game.maxStake} GCT
          </span>
        </div>

        <Button
          className="w-full font-semibold"
          onClick={() => onPlay?.(game.id)}
          data-testid={`button-play-${game.id}`}
        >
          Play Now
        </Button>
      </div>
    </Card>
  );
}
