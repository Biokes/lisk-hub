import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { makeConfig } from "./wallet/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string;

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={makeConfig(projectId)}>
      <RainbowKitProvider theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}>
        <App />
      </RainbowKitProvider>
    </WagmiProvider>
  </QueryClientProvider>
);
