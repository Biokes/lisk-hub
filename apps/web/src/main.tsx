import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
import { WagmiProvider } from "wagmi";
import { makeConfig, liskSepolia } from "./wallet/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { RainbowKitProvider, darkTheme, lightTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string;

try {
  const config = getDefaultConfig({
    appName: 'Lisk Gaming Hub',
    projectId,
    chains: [liskSepolia],
    ssr: false,
  });

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
  
} catch (error) {
  console.error("Failed to create RainbowKit config, falling back to original config", error);
  
  const fallbackConfig = makeConfig(projectId);
  
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={fallbackConfig}>
        <RainbowKitProvider theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
