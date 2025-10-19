import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight } from "lucide-react";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
  onPlay: (gameRoute: string) => void;
}

export function GameCard({ game, onPlay }: GameCardProps) {

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer border border-card-border hover:border-primary/30" data-testid={`card-game-${game.id}`}>
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-card to-card/70 border-b border-card-border">
        <div className="absolute inset-0 opacity-40" />
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
        
        <Button onClick={() => onPlay(game.id)} data-testid={`button-play-${game.id}`}
          className={"w-full font-semibold py-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 group/btn mt-2"}
        >
          <span>Play Now</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Card>
  );
}