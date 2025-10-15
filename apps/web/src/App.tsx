import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NetworkGuard from "@/components/NetworkGuard";
import { Header } from "@/components/Header";
import { useWallet } from "./wallet/useWallet";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { address, walletBalance, connect } = useWallet();
  return (
    <TooltipProvider>
      <Header walletAddress={address} walletBalance={walletBalance} onWalletConnect={() => connect()} />
      <Toaster />
      <NetworkGuard>
        <Router />
      </NetworkGuard>
    </TooltipProvider>
  );
}

export default App;
