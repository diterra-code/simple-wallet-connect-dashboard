import { NextRequest, NextResponse } from "next/server";

const COVALENT_API_KEY = process.env.COVALENT_API_KEY;
const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address parameter is required" },
      { status: 400 }
    );
  }

  if (!COVALENT_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${COVALENT_API_KEY}`,
    };

    // Get balances
    const balancesRes = await fetch(
      `${COVALENT_BASE_URL}/gnosis-mainnet/address/${address}/balances_v2/`,
      { headers, next: { revalidate: 60 } }
    );

    // Get transactions
    const transactionsRes = await fetch(
      `${COVALENT_BASE_URL}/gnosis-mainnet/address/${address}/transactions_v3/?limit=20`,
      { headers, next: { revalidate: 60 } }
    );

    if (!balancesRes.ok) {
      const errorText = await balancesRes.text();
      console.error("Covalent balances error:", balancesRes.status, errorText);
      throw new Error(`Covalent balances API error: ${balancesRes.status}`);
    }
    
    if (!transactionsRes.ok) {
      const errorText = await transactionsRes.text();
      console.error("Covalent transactions error:", transactionsRes.status, errorText);
      throw new Error(`Covalent transactions API error: ${transactionsRes.status}`);
    }

    const balancesData = await balancesRes.json();
    const transactionsData = await transactionsRes.json();

    const items = balancesData.data?.items || [];
    
    // Separate native token and ERC-20 tokens
    const nativeToken = items.find((item: any) => item.native_token);
    const tokens = items.filter((item: any) => !item.native_token && item.quote > 0);

    // Calculate total value
    const totalValue = items.reduce((sum: number, item: any) => sum + (item.quote || 0), 0);

    const walletData = {
      address,
      nativeBalance: {
        balance: nativeToken?.balance || "0",
        quote: nativeToken?.quote || 0,
      },
      tokens: tokens.map((token: any) => ({
        contract_name: token.contract_name || "Unknown",
        contract_ticker_symbol: token.contract_ticker_symbol || "???",
        balance: token.balance || "0",
        quote: token.quote || 0,
        contract_decimals: token.contract_decimals || 18,
        logo_url: token.logo_url || "",
      })),
      transactions: (transactionsData.data?.items || []).map((tx: any) => ({
        tx_hash: tx.tx_hash || "",
        from_address: tx.from_address || "",
        to_address: tx.to_address || "",
        value: tx.value || "0",
        value_quote: tx.value_quote || 0,
        block_signed_at: tx.block_signed_at || new Date().toISOString(),
        fees_paid: tx.fees_paid || "0",
      })),
      totalValue,
    };

    return NextResponse.json(walletData);
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallet data" },
      { status: 500 }
    );
  }
}