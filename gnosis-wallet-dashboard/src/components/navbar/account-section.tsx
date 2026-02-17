"use client";

import { useAccount, useEnsName } from "wagmi";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { App } from "../../interface/app";
import { LoginButton } from "../auth";
import { useConnectedUser } from "../connected-user";
import AccountMenu from "./account-menu";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { NavAccountDetailsProps } from "./account-widget";
import { useAuthProvider } from "../../context/lib";
import { useMemo } from "react";
import { type Address } from "viem";

interface AccountSectionProps extends Pick<
	NavAccountDetailsProps,
	"widgetItems" | "actionItems"
> {
	app: App;
}

const AccountSection = ({ app, widgetItems, actionItems }: AccountSectionProps) => {
	const { user } = useConnectedUser();
	const authProvider = useAuthProvider();

	// Wagmi hooks (for general/RainbowKit)
	const { address: wagmiAddress } = useAccount();
	const wagmiEnsName = useEnsName({
		address: wagmiAddress,
		query: { enabled: Boolean(wagmiAddress) && authProvider === "general" },
	});

	// Privy hooks
	const { ready: privyReady } = usePrivy();
	const { wallets } = useWallets();

	// Determine which address and ENS to use
	const { address, ensNameResult } = useMemo(() => {
		if (authProvider === "privy") {
			const activeWallet = wallets.find(
				(wallet) =>
					wallet.walletClientType === "privy" ||
					wallet.walletClientType === "embedded_wallet" ||
					wallet.walletClientType?.includes("embedded"),
			);

			return {
				address: activeWallet?.address as Address | undefined,
				ensNameResult: {
					data: undefined,
					isLoading: !privyReady,
					isError: false,
				},
			};
		}

		// General/RainbowKit
		return {
			address: wagmiAddress,
			ensNameResult: wagmiEnsName,
		};
	}, [authProvider, wallets, privyReady, wagmiAddress, wagmiEnsName]);

	if (user.status === "CONNECTED" && address) {
		return (
			<AccountMenu
				widgetItems={widgetItems}
				actionItems={actionItems}
				userAddress={address}
				ensNameResult={ensNameResult}
				app={app}
			/>
		);
	}

	return (
		<div className="mt-6 md:mt-0">
			<LoginButton
				app={app}
				status={user.status}
				rightIcon={<SignInIcon size={24} />}
			/>
		</div>
	);
};

export default AccountSection;
