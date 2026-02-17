interface TokenBalance {
  contract_name: string;
  contract_ticker_symbol: string;
  balance: string;
  quote: number;
  contract_decimals: number;
  logo_url: string;
}

interface Transaction {
  tx_hash: string;
  from_address: string;
  to_address: string;
  value: string;
  value_quote: number;
  block_signed_at: string;
  fees_paid: string;
}

interface WalletData {
  address: string;
  nativeBalance: {
    balance: string;
    quote: number;
  };
  tokens: TokenBalance[];
  transactions: Transaction[];
  totalValue: number;
}