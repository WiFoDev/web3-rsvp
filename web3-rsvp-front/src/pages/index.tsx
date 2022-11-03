import type {NextPage} from "next";

import {ConnectButton} from "@rainbow-me/rainbowkit";

import {Layout} from "@/Layout";

const Home: NextPage = () => {
  return (
    <section>
      <ConnectButton />
    </section>
  );
};

export default Home;
