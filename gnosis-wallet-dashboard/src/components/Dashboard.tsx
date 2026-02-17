"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import LiftedButton from "./LiftedButton";

interface DashboardProps {
  address: string;
}

interface WalletData {
  address: string;
  nativeBalance: {
    balance: string;
    quote: number;
  };
  tokens: Array<{
    contract_name: string;
    contract_ticker_symbol: string;
    balance: string;
    quote: number;
    contract_decimals: number;
    logo_url: string;
  }>;
  transactions: Array<{
    tx_hash: string;
    from_address: string;
    to_address: string;
    value: string;
    value_quote: number;
    block_signed_at: string;
    fees_paid: string;
  }>;
  totalValue: number;
}

export function Dashboard({ address }: DashboardProps) {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching wallet data for address:", address);
        const response = await fetch(`/api/wallet-data?address=${address}`, {
          cache: 'no-store'
        });
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          console.error("API Error:", errorData);
          throw new Error(errorData.error || `Failed to load wallet data (${response.status})`);
        }
        
        const walletData = await response.json();
        setData(walletData);
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError(err instanceof Error ? err.message : "Failed to load wallet data");
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchData();
      
      // Auto-refresh every 30 seconds
      const intervalId = setInterval(fetchData, 30000);
      
      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [address]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-paper-0 rounded-2xl border border-paper-2 p-12">
        <div className="text-system-red mb-4 text-h5">{error}</div>
        <LiftedButton 
          preset="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </LiftedButton>
      </div>
    );
  }

  if (!data) return null;

  const formatBalance = (balance: string, decimals: number) => {
    try {
      return parseFloat(formatUnits(BigInt(balance), decimals)).toFixed(4);
    } catch {
      return "0";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const safeToLocaleString = (value: number | null | undefined, defaultValue: string = "0.00") => {
    if (value === null || value === undefined || isNaN(value)) {
      return defaultValue;
    }
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-8">
      {/* Total Value Card */}
      <div className="bg-paper-0 rounded-2xl p-8 border border-paper-2 shadow-sm">
        <h2 className="text-caption text-surface-grey uppercase tracking-wide mb-2">Total Portfolio Value</h2>
        <p className="text-h2 text-primary-orange">
          ${safeToLocaleString(data.totalValue)}
        </p>
      </div>

      {/* Native Balance */}
      <div className="bg-paper-0 rounded-2xl p-8 border border-paper-2 shadow-sm">
        <h2 className="text-caption text-surface-grey uppercase tracking-wide mb-4">Native Balance (xDAI)</h2>
        <div className="flex justify-between items-center">
          <span className="text-h4 text-text-standard">
            {formatBalance(data.nativeBalance?.balance || "0", 18)} xDAI
          </span>
          <span className="text-h4 text-system-green">
            ${safeToLocaleString(data.nativeBalance?.quote)}
          </span>
        </div>
      </div>

      {/* Token Balances */}
      <div className="bg-paper-0 rounded-2xl p-8 border border-paper-2 shadow-sm">
        <h2 className="text-caption text-surface-grey uppercase tracking-wide mb-6">Token Balances</h2>
        {!data.tokens || data.tokens.length === 0 ? (
          <p className="text-surface-grey text-body">No tokens found</p>
        ) : (
          <div className="space-y-4">
            {data.tokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-paper-1 last:border-0">
                <div className="flex items-center gap-3">
                  {token?.logo_url && (
                    <img src={token.logo_url} alt={token.contract_name || "Token"} className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <p className="font-breadBody font-bold text-text-standard">{token?.contract_name || "Unknown Token"}</p>
                    <p className="text-sm text-surface-grey">{token?.contract_ticker_symbol || "???"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-breadBody font-bold text-text-standard">
                    {formatBalance(token?.balance || "0", token?.contract_decimals || 18)} {token?.contract_ticker_symbol || ""}
                  </p>
                  <p className="text-sm text-system-green">
                    ${safeToLocaleString(token?.quote)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-paper-0 rounded-2xl p-8 border border-paper-2 shadow-sm">
        <h2 className="text-caption text-surface-grey uppercase tracking-wide mb-6">Recent Transactions</h2>
        {!data.transactions || data.transactions.length === 0 ? (
          <p className="text-surface-grey text-body">No transactions found</p>
        ) : (
          <div className="space-y-4">
            {data.transactions.map((tx, index) => (
              <div key={index} className="py-4 border-b border-paper-1 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-surface-grey">{formatDate(tx?.block_signed_at)}</span>
                  <a 
                    href={`https://gnosisscan.io/tx/${tx?.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-blue-2 text-sm font-bold"
                  >
                    {truncateAddress(tx?.tx_hash || "")}
                  </a>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="text-surface-grey">
                    From: {truncateAddress(tx?.from_address || "")}
                  </div>
                  <div className="text-surface-grey">
                    To: {truncateAddress(tx?.to_address || "")}
                  </div>
                </div>
                <div className="text-right">
                  <span className={tx?.from_address?.toLowerCase() === address.toLowerCase() ? "text-system-red font-bold" : "text-system-green font-bold"}>
                    {tx?.from_address?.toLowerCase() === address.toLowerCase() ? "-" : "+"}
                    ${safeToLocaleString(tx?.value_quote)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}