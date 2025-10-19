import { HeroSection } from "@/components/HeroSection";
import { GameGrid } from "@/components/GameGrid";
import type { Game } from "@shared/schema";
import { useLocation } from "wouter";


export default function Home() {
  const [, navigate] = useLocation(); 
  const games: Game[] = []
  
  const handlePlayGame = (gameRoute: string) => {
    navigate(`/${gameRoute}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div data-testid="games-section">
        <GameGrid games={games} onPlayGame={handlePlayGame} />
      </div>
    </div>
  );
}