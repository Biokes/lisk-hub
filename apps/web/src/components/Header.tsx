import { WalletButton } from "./WalletButton";
import { NetworkIndicator } from "./NetworkIndicator";
import { Gamepad2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">
            Lisk Gaming
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <NetworkIndicator />
          <ThemeToggle />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
