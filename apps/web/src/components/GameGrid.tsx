import { GameCard } from "./GameCard";
import type { Game } from "@shared/schema";

interface GameGridProps {
  games: Game[];
  onPlayGame?: (gameId: string) => void;
}

export function GameGrid({ games, onPlayGame }: GameGridProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 availableGame">
            Available Games
          </h2>
          <p className="text-muted-foreground">
            Choose a game, connect your wallet, stake and earn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div key={game.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <GameCard game={game} onPlay={onPlayGame} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
