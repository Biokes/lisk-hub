import { Coins, Shield, Zap } from "lucide-react";


export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-32 min-h-screen md:min-h-screen flex items-center justify-center home">
     
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 animate-float pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 translate-y-1/2 animate-float pointer-events-none" style={{ animationDelay: "0.5s" }} />

      <div className="container mx-auto px-4 relative z-20 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
          
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg connectText">
              <span className="inline-block animate-slide-in-left">Connect.</span>
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.2s" }}>Play.</span>
              <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.4s" }}>Win.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-base lg:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-fade-in px-2" style={{ animationDelay: "0.5s" }}>
              The ultimate blockchain gaming hub where skill meets stake. Connect your wallet and compete for real rewards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 md:pt-8 animate-fade-in px-2" style={{ animationDelay: "0.7s" }}>
            <FeatureCard icon={Shield} title="Secure" description="Smart contract powered games with provably fair outcomes" delay={0}/>
            <FeatureCard icon={Zap} title="Instant" description="Lightning-fast transactions on the blockchain" delay={1}/>
            <FeatureCard icon={Coins} title="Rewarding" description="Winners take the pot with minimal platform fees" delay={2}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any,title: string,description: string,delay: number }) {
  return (
    <div
      className="px-4 py-3 sm:p-6 rounded-lg sm:rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur hover:scale-[1.03] hover:border-primary/50 hover:bg-white/15 transition-all duration-300 group cursor-pointer animate-fade-in h-full"
      style={{ animationDelay: `${0.6 + delay * 0.15}s` }}
    >
      <div className="h-4 sm:h-10 w-8 sm:w-10 mx-auto mb-3 sm:mb-4 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 group-hover:scale-110 transform transition-all duration-300">
        <Icon className="h-4 sm:h-5 w-5 sm:w-6 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-xs text-slate-200 group-hover:text-white transition-colors duration-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}