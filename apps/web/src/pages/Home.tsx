import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GameGrid } from "@/components/GameGrid";
import { StakingDialog } from "@/components/StakingDialog";
import { WinnerDialog } from "@/components/WinnerDialog";
import type { Game, GameResult } from "@shared/schema";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [walletBalance, setWalletBalance] = useState(1250);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showStaking, setShowStaking] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  // todo: remove mock functionality
  const mockGames: Game[] = [
    {
      id: "1",
      name: "Crypto Clash",
      description: "Battle it out in this high-stakes strategy game where winners take all",
      minStake: 10,
      maxStake: 1000,
      playerCount: 42,
      category: "Strategy",
      imageUrl: "",
    },
    {
      id: "2",
      name: "Token Tycoon",
      description: "Build your crypto empire and dominate the market",
      minStake: 25,
      maxStake: 500,
      playerCount: 28,
      category: "Economy",
      imageUrl: "",
    },
    {
      id: "3",
      name: "Block Blitz",
      description: "Fast-paced action game with instant rewards",
      minStake: 5,
      maxStake: 250,
      playerCount: 67,
      category: "Action",
      imageUrl: "",
    },
    {
      id: "4",
      name: "Chain Racer",
      description: "Speed through blockchain networks in this thrilling racing game",
      minStake: 15,
      maxStake: 750,
      playerCount: 35,
      category: "Racing",
      imageUrl: "",
    },
    {
      id: "5",
      name: "DeFi Defender",
      description: "Protect your assets from market volatility in this tower defense game",
      minStake: 50,
      maxStake: 2000,
      playerCount: 19,
      category: "Defense",
      imageUrl: "",
    },
    {
      id: "6",
      name: "NFT Arena",
      description: "Battle with unique NFT characters in the ultimate showdown",
      minStake: 100,
      maxStake: 5000,
      playerCount: 53,
      category: "Combat",
      imageUrl: "",
    },
  ];

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    console.log("Wallet connected:", address);
  };

  const handlePlayGame = (gameId: string) => {
    if (!walletAddress) {
      console.log("Please connect wallet first");
      return;
    }
    const game = mockGames.find(g => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setShowStaking(true);
    }
  };

  const handleConfirmStake = (gameId: string, amount: number) => {
    console.log("Stake confirmed:", gameId, amount);
    setWalletBalance(prev => prev - amount);
    
    // todo: remove mock functionality - simulate game completion
    setTimeout(() => {
      const mockResult: GameResult = {
        gameId,
        winner: walletAddress!,
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
      setWalletBalance(prev => prev + gameResult.prize);
      console.log("Rewards claimed");
    }
  };

  const handleGetStarted = () => {
    if (!walletAddress) {
      const walletButton = document.querySelector('[data-testid="button-connect-wallet"]') as HTMLElement;
      walletButton?.click();
    } else {
      const gamesSection = document.querySelector('[data-testid="games-section"]');
      gamesSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!walletAddress && <HeroSection onGetStarted={handleGetStarted} />}
      <div data-testid="games-section">
        <GameGrid games={mockGames} onPlayGame={handlePlayGame} />
      </div>
      <StakingDialog
        game={selectedGame}
        open={showStaking}
        onOpenChange={setShowStaking}
        walletBalance={walletBalance}
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
