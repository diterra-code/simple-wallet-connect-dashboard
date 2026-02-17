"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Dashboard } from "@/components/Dashboard";
import { Logo } from "@/components/Logo";
import { LiftedButton } from "@/components/LiftedButton";
import "@rainbow-me/rainbowkit/styles.css";

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen bg-paper-main">
      {/* Header with Bread Logo */}
      <header className="py-4 px-6 md:px-12 flex items-center justify-between border-b border-paper-2">
        <div className="flex items-center gap-4">
          <Logo size={40} color="orange" text="Solidarity Fund" />
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {isConnected && address ? (
          <Dashboard address={address} />
        ) : (
          <div className="text-center py-20 bg-paper-0 rounded-2xl border border-paper-2 p-12">
            <h1 className="text-h3 text-primary-orange mb-6">
              Connect Your Wallet
            </h1>
            <p className="text-h5 text-surface-grey mb-8 max-w-md mx-auto">
              Connect your wallet to view your Gnosis Chain wallet stats and track your solidarity fund
            </p>
            <div className="flex justify-center">
              <LiftedButton 
                preset="primary" 
                onClick={() => document.querySelector('button')?.click()}
              >
                Connect Wallet
              </LiftedButton>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-paper-2 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-caption text-surface-grey">
            Powered by Bread Cooperative • Gnosis Chain
          </p>
        </div>
      </footer>
    </main>
  );
}