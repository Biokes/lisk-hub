'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Shield, Zap } from "lucide-react";
import gamer from '../assets/games.mp4';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-32 min-h-screen md:min-h-screen flex items-center justify-center">
      
      {/* Video Background with Opacity */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src={gamer}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay with opacity */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 animate-float pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 translate-y-1/2 animate-float pointer-events-none" style={{ animationDelay: "0.5s" }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
          
          {/* Title */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-semi-bold text-white leading-tight drop-shadow-lg">
              <span className="inline-block animate-slide-in-left">Stake.</span>
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.2s" }}>Play.</span>
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.4s" }}>Win.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-base lg:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-fade-in px-2" style={{ animationDelay: "0.5s" }}>
              The ultimate blockchain gaming hub where skill meets stake. Connect your wallet and compete for real rewards.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center animate-fade-in px-2" style={{ animationDelay: "0.6s" }}>
            <Button
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 group w-full sm:w-auto"
              onClick={onGetStarted}
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold backdrop-blur-md border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 md:pt-8 animate-fade-in px-2" style={{ animationDelay: "0.7s" }}>
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

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any
  title: string
  description: string
  delay: number 
}) {
  return (
    <div
      className="p-4 sm:p-6 rounded-lg sm:rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl hover:border-primary/50 hover:bg-white/15 transition-all duration-300 group cursor-pointer animate-fade-in h-full"
      style={{ animationDelay: `${0.6 + delay * 0.15}s` }}
    >
      <div className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-3 sm:mb-4 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 group-hover:scale-110 transform transition-all duration-300">
        <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-200 group-hover:text-white transition-colors duration-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}