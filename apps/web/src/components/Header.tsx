import { Gamepad2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <div className="h-[50px] w-auto overflow-hidden">
            <img src="/logo.png" alt="Gamii logo" className="w-full h-full object-center"/>
          </div>
          <h1 className="text-lg sm:text-2xl font-display font-bold text-primary truncate gamii">
            Gamii
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* <NetworkIndicator /> */}
          <ThemeToggle />
          {/* <WalletButton /> */}
        </div>
      </div>
    </header>
  );
}