"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Dashboard } from "@/components/Dashboard";
import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Gnosis Chain Wallet</h1>
          <ConnectButton />
        </header>

        {isConnected && address ? (
          <Dashboard address={address} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Connect your wallet to view your Gnosis Chain stats
            </p>
          </div>
        )}
      </div>
    </main>
  );
}