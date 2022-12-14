import {ConnectButton} from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Web3RSVP</title>
        <meta
          content="Descentralize Events Platform"
          name="Web3RSVP"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header className="sticky top-0 z-20 w-full border-b-2 bg-background border-parragraf">
        <nav className="flex h-16 mx-auto max-w-screen-standar items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <div className="mr-auto text-xl">
            <Link href="/">Web3RSVP</Link>
          </div>
          <ul className="flex items-center gap-4">
            <li className="border-[1px] border-primary rounded p-2 text-primary text-sm hover:bg-primary hover:border-none hover:text-white transition duration-500">
              <Link href="/create-event">Create New Event</Link>
            </li>
            <li>
              <ConnectButton />
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative flex flex-col items-center justify-center w-full h-full">
        {children}
      </main>
      <footer className="relative pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-screen-standar py-12 flex justify-center pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          Made with love by WiFo ❤️
        </div>
      </footer>
    </>
  );
};
