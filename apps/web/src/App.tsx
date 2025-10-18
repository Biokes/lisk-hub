import { useState } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NetworkGuard from "@/components/NetworkGuard";
import { Header } from "@/components/Header";
import { WinnerDialog } from "@/components/WinnerDialog";
import { useWinnerEvents } from "@/hooks/use-winner-events";
import { useAccount } from "wagmi";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import type { GameResult } from "@shared/schema";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { address } = useAccount();
  const [showWinner, setShowWinner] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useWinnerEvents({
    onWinner: (event) => {
      if (address && event.winner.toLowerCase() === address.toLowerCase()) {
        const result: GameResult = {
          gameId: event.gameId,
          winner: event.winner,
          prize: Number(event.prize) / 1e18,
          platformFee: Number(event.prize) / 1e18 * 0.1,
          timestamp: new Date(event.timestamp * 1000).toISOString(),
        };
        setGameResult(result);
        setShowWinner(true);
      }
    },
  });

  const handleClaimRewards = () => {
    if (gameResult) {
      console.log("Rewards claimed");
    }
  };

  return (
    <TooltipProvider>
      <Header />
      <Toaster />
      <NetworkGuard>
        <Router />
      </NetworkGuard>
      <WinnerDialog
        result={gameResult}
        open={showWinner}
        onOpenChange={setShowWinner}
        onClaim={handleClaimRewards}
      />
    </TooltipProvider>
  );
}

export default App;
