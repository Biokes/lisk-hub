import { HeroSection } from "@/components/HeroSection";
import { GameGrid } from "@/components/GameGrid";
import type { Game } from "@shared/schema";


export default function Home() {
  const games: Game[] = [
    {
      name: "PingPong",
      description: "A two player game like Tennis, where this is just a dummy data for or what dou think is happening inside of it",
      playerCount: 120,
      imageUrl: '/pongIt.png',
      route: 'https://pong-it.vercel.app',
      isReady: true
    },
    {
      name: "Texas Holdem",
      description: "Casino poker",
      playerCount: 120,
      imageUrl: '/pongIt.png',
      route: 'https://pong-it.vercel.app',
      isReady: false
    },
    {
      name: "PingPong",
      description: "gamiit",
      playerCount: 120,
      imageUrl: '/pongIt.png',
      route: 'https://pong-it.vercel.app',
      isReady: false
    }
  ]

  const handlePlayGame = (gameRoute: string) => {
    window.location.href = gameRoute;
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