import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Shield, Zap } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-tight">
              Stake. Play. Win.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              The ultimate blockchain gaming hub where skill meets stake. Connect your wallet and compete for real rewards.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center" style={{ animationDelay: "0.1s" }}>
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              onClick={onGetStarted}
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold backdrop-blur-sm"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12" style={{ animationDelay: "0.2s" }}>
            <FeatureCard
              icon={Shield}
              title="Secure"
              description="Smart contract powered games with provably fair outcomes"
            />
            <FeatureCard
              icon={Zap}
              title="Instant"
              description="Lightning-fast transactions on the blockchain"
            />
            <FeatureCard
              icon={Coins}
              title="Rewarding"
              description="Winners take the pot with minimal platform fees"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all">
      <Icon className="h-10 w-10 text-primary mb-3 mx-auto" />
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
