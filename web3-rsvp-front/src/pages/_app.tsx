import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type {AppProps} from "next/app";

import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";

import {Layout} from "@/Layout";

const {chains, provider} = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID}),
    publicProvider(),
  ],
);

const {connectors} = getDefaultWallets({
  appName: "Web3RSVP App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
