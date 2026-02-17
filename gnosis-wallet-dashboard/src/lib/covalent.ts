const COVALENT_API_KEY = process.env.COVALENT_API_KEY;
const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";

export async function getWalletData(address: string) {
  const headers = {
    Authorization: `Bearer ${COVALENT_API_KEY}`,
  };

  // Get balances
  const balancesRes = await fetch(
    `${COVALENT_BASE_URL}/gnosis-mainnet/address/${address}/balances_v2/`,
    { headers }
  );

  // Get transactions
  const transactionsRes = await fetch(
    `${COVALENT_BASE_URL}/gnosis-mainnet/address/${address}/transactions_v3/?limit=20`,
    { headers }
  );

  if (!balancesRes.ok || !transactionsRes.ok) {
    throw new Error("Failed to fetch wallet data");
  }

  const balancesData = await balancesRes.json();
  const transactionsData = await transactionsRes.json();

  const items = balancesData.data?.items || [];
  
  // Separate native token and ERC-20 tokens
  const nativeToken = items.find((item: any) => item.native_token);
  const tokens = items.filter((item: any) => !item.native_token && item.quote > 0);

  // Calculate total value
  const totalValue = items.reduce((sum: number, item: any) => sum + (item.quote || 0), 0);

  return {
    address,
    nativeBalance: {
      balance: nativeToken?.balance || "0",
      quote: nativeToken?.quote || 0,
    },
    tokens: tokens.map((token: any) => ({
      contract_name: token.contract_name,
      contract_ticker_symbol: token.contract_ticker_symbol,
      balance: token.balance,
      quote: token.quote,
      contract_decimals: token.contract_decimals,
      logo_url: token.logo_url,
    })),
    transactions: transactionsData.data?.items?.map((tx: any) => ({
      tx_hash: tx.tx_hash,
      from_address: tx.from_address,
      to_address: tx.to_address,
      value: tx.value,
      value_quote: tx.value_quote,
      block_signed_at: tx.block_signed_at,
      fees_paid: tx.fees_paid,
    })) || [],
    totalValue,
  };
}