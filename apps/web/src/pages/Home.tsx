import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GameGrid } from "@/components/GameGrid";
import { StakingDialog } from "@/components/StakingDialog";
import { WinnerDialog } from "@/components/WinnerDialog";
import { GAME_ADDRESSES } from "@/constants/games";
import type { Game, GameResult } from "@shared/schema";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showStaking, setShowStaking] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const games: Game[] = GAME_ADDRESSES.map((game: typeof GAME_ADDRESSES[number]) => ({
    id: game.id,
    name: game.name,
    description: game.description,
    minStake: parseFloat(game.fixedDeposit),
    maxStake: parseFloat(game.fixedDeposit),
    playerCount: Math.floor(Math.random() * 100) + 1,
    category: "Gaming",
    imageUrl: "",
  }));

  const handlePlayGame = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setShowStaking(true);
    }
  };

  const handleConfirmStake = (gameId: string, amount: number) => {
    console.log("Stake confirmed:", gameId, amount);
    
    setTimeout(() => {
      const mockResult: GameResult = {
        gameId,
        winner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        prize: amount * 1.9,
        platformFee: amount * 0.1,
        timestamp: new Date().toISOString(),
      };
      setGameResult(mockResult);
      setShowWinner(true);
    }, 3000);
  };

  const handleClaimRewards = () => {
    if (gameResult) {
      console.log("Rewards claimed");
    }
  };

  const handleGetStarted = () => {
    const walletButton = document.querySelector('[data-testid="button-connect-wallet"]') as HTMLElement;
    walletButton?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={handleGetStarted} />
      <div data-testid="games-section">
        <GameGrid games={games} onPlayGame={handlePlayGame} />
      </div>
      <StakingDialog
        game={selectedGame}
        open={showStaking}
        onOpenChange={setShowStaking}
        onConfirmStake={handleConfirmStake}
      />
      <WinnerDialog
        result={gameResult}
        open={showWinner}
        onOpenChange={setShowWinner}
        onClaim={handleClaimRewards}
      />
    </div>
  );
}