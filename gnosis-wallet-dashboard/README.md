# Gnosis Chain Wallet Dashboard

A simple Next.js app to view your Gnosis Chain wallet stats.

## Features

- Connect/disconnect wallet (MetaMask, WalletConnect, etc.)
- View native xDAI balance
- View ERC-20 token balances with USD values
- View recent transaction history
- Total portfolio value in USD

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with your API keys:
```
COVALENT_API_KEY=your_covalent_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## API Keys Required

### Covalent API Key
- Get yours at: https://www.covalenthq.com/platform/auth/register/
- Free tier: 100,000 API calls/month

### WalletConnect Project ID
- Get yours at: https://cloud.walletconnect.com/
- Free tier: Unlimited

## Tech Stack

- Next.js 14
- RainbowKit (wallet connection)
- Wagmi (blockchain interactions)
- Covalent API (wallet data)
- Tailwind CSS (styling)