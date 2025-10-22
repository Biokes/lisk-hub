import { GameCard } from "./GameCard";
import type { Game } from "@shared/schema";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface GameGridProps {
  games: Game[];
  onPlayGame: (gameId: string) => void;
}

export function GameGrid({ games, onPlayGame }: GameGridProps) {
  const { toast } = useToast()
  const handleCreateBounty = () => { 
    toast({
      title: "",
      description: "This feature is coming soon."
    })
  }
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="flex px-2 justify-between items-center mb-8">
          <div className="">
            <h2 className="text-lg md:text-4xl font-display font-bold mb-2 availableGame">
              Available Games
            </h2>
            <p className="text-muted-foreground text-xs -mt-[10px] md:text-[1rem] md:-mt-[5px]">
              Choose a game, connect your wallet, stake and earn.
            </p>
          </div>
          <Button className={cn("capitalize text-sm")} onClick={handleCreateBounty}>
            create Tournament
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <GameCard game={game} onPlay={() => onPlayGame(game.route)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
