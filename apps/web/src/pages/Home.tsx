import { HeroSection } from "@/components/HeroSection";
import { GameGrid } from "@/components/GameGrid";
import type { Game } from "@shared/schema";


export default function Home() {
  const games: Game[] = [
    {
      name: "PingPong",
      description:"A fast-paced two-player arcade classic inspired by table tennis. Test your reflexes and precision as you battle an opponent in real time for ultimate bragging rights.",
      playerCount: 81,
      imageUrl: '/pongIt.png',
      route: 'https://pong-it.vercel.app',
      isReady: true
    },
    {
      name: "ZK Poker",
      description:  "A decentralized Texas Hold’em experience where players compete with zero-knowledge proof fairness — bringing the thrill of casino poker to the blockchain.",
      playerCount: 6,
      imageUrl: '/ZKPoker.png',
      route: 'https://texas-seven.vercel.app/',
      isReady: true
    },
    {
      name: "Checkers",
      description: "The timeless strategy board game reimagined for the digital age. Outsmart your opponent and dominate the board in classic checkers style.",
      playerCount: 120,
      imageUrl: '/checkers.png',
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