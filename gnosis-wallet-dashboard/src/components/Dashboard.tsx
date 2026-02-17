"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";

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
      
      // Auto-refresh every 5 seconds
      const intervalId = setInterval(fetchData, 5000);
      
      // Clean up interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [address]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
        >
          Retry
        </button>
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-2">Total Portfolio Value</h2>
        <p className="text-4xl font-bold text-white">
          ${safeToLocaleString(data.totalValue)}
        </p>
      </div>

      {/* Native Balance */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-4">Native Balance (xDAI)</h2>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">
            {formatBalance(data.nativeBalance?.balance || "0", 18)} xDAI
          </span>
          <span className="text-green-400">
            ${safeToLocaleString(data.nativeBalance?.quote)}
          </span>
        </div>
      </div>

      {/* Token Balances */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-4">Token Balances</h2>
        {!data.tokens || data.tokens.length === 0 ? (
          <p className="text-gray-500">No tokens found</p>
        ) : (
          <div className="space-y-3">
            {data.tokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  {token?.logo_url && (
                    <img src={token.logo_url} alt={token.contract_name || "Token"} className="w-8 h-8 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{token?.contract_name || "Unknown Token"}</p>
                    <p className="text-sm text-gray-400">{token?.contract_ticker_symbol || "???"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatBalance(token?.balance || "0", token?.contract_decimals || 18)} {token?.contract_ticker_symbol || ""}
                  </p>
                  <p className="text-sm text-green-400">
                    ${safeToLocaleString(token?.quote)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-gray-400 text-sm uppercase tracking-wide mb-4">Recent Transactions</h2>
        {!data.transactions || data.transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found</p>
        ) : (
          <div className="space-y-3">
            {data.transactions.map((tx, index) => (
              <div key={index} className="py-3 border-b border-gray-700 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm text-gray-400">{formatDate(tx?.block_signed_at)}</span>
                  <a 
                    href={`https://gnosisscan.io/tx/${tx?.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    {truncateAddress(tx?.tx_hash || "")}
                  </a>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-400">
                    From: {truncateAddress(tx?.from_address || "")}
                  </div>
                  <div className="text-gray-400">
                    To: {truncateAddress(tx?.to_address || "")}
                  </div>
                </div>
                <div className="mt-1 text-right">
                  <span className={tx?.from_address?.toLowerCase() === address.toLowerCase() ? "text-red-400" : "text-green-400"}>
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