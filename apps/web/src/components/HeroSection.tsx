'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Shield, Zap } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 animate-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10 dark:opacity-20" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl opacity-20 dark:opacity-30 -translate-y-1/2 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl opacity-20 dark:opacity-30 translate-y-1/2 animate-float" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Title with word-by-word animation */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white leading-tight h-28 md:h-40 flex items-center justify-center">
              <span className="word-animate">Stake.</span>
              <span className="word-animate">Play.</span>
              <span className="word-animate">Win.</span>
            </h1>

            {/* Paragraph with continuous fade in/out */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto paragraph-animate leading-relaxed">
              The ultimate blockchain gaming hub where skill meets stake. Connect your wallet and compete for real rewards.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center animate-slide-in-delayed" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/30 animate-pulse-glow transition-all duration-300 group"
              onClick={onGetStarted}
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold backdrop-blur-md border border-slate-300 dark:border-slate-600/50 text-foreground dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-slide-in-delayed" style={{ animationDelay: "0.5s" }}>
            <FeatureCard
              icon={Shield}
              title="Secure"
              description="Smart contract powered games with provably fair outcomes"
              delay={0}
            />
            <FeatureCard
              icon={Zap}
              title="Instant"
              description="Lightning-fast transactions on the blockchain"
              delay={1}
            />
            <FeatureCard
              icon={Coins}
              title="Rewarding"
              description="Winners take the pot with minimal platform fees"
              delay={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) {
  return (
    <div
      className="p-6 rounded-xl border border-slate-200 dark:border-slate-700/40 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/60 dark:to-slate-950/40 backdrop-blur-md hover:border-primary/50 dark:hover:border-primary/50 hover:from-slate-50 dark:hover:from-slate-900/80 hover:to-slate-100 dark:hover:to-slate-950/60 transition-all duration-300 group cursor-pointer card-animate"
      style={{ animationDelay: `${0.6 + delay * 0.15}s` }}
    >
      <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center group-hover:from-primary/30 dark:group-hover:from-primary/40 group-hover:to-primary/20 dark:group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110 transform">
        <Icon className="h-6 w-6 text-primary dark:text-primary group-hover:text-primary transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">{description}</p>
    </div>
  );
}