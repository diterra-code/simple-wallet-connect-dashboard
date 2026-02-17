"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { ReactNode } from "react";
import LiftedButton from "../LiftedButton/LiftedButton";
import { ButtonShell } from "./button-shell";
import { App } from "../../interface/app";
import { gnosis } from "viem/chains";

export interface LoginButtonPrivyProps {
	app: App;
	status: "CONNECTED" | "LOADING" | "UNSUPPORTED_CHAIN" | "NOT_CONNECTED";
	label?: string;
	rightIcon?: ReactNode;
	isProd?: boolean;
}

export const LoginButtonPrivy = ({
	app,
	status,
	label = "Sign In",
	rightIcon,
	isProd = true,
}: LoginButtonPrivyProps) => {
	const className =
		app === "fund"
			? "bg-primary-orange"
			: app === "stacks"
				? "bg-primary-blue"
				: "bg-primary-jade";

	const { login, ready } = usePrivy();
	const { wallets } = useWallets();

	if (status === "CONNECTED") return null;

	if (status === "LOADING" || !ready) return <ButtonShell />;

	if (status === "UNSUPPORTED_CHAIN") {
		const activeWallet = wallets[0];

		return (
			<SwitchNetwork
				activeWallet={activeWallet}
				isProd={isProd}
				className={className}
			/>
		);
	}

	return (
		<div className="[&>*]:w-full">
			<LiftedButton
				onClick={login}
				rightIcon={rightIcon}
				className={`w-full ${className}`}
			>
				{label}
			</LiftedButton>
		</div>
	);
};

function SwitchNetwork({
	activeWallet,
	isProd,
	className,
}: {
	activeWallet: ConnectedWallet;
	isProd: boolean;
	className?: string;
}) {
	return (
		<div className="[&>*]:w-full">
			<LiftedButton
				onClick={async () => {
					if (!activeWallet) return;

					try {
						const targetChainId = isProd ? gnosis.id : 31337;
						await activeWallet.switchChain(targetChainId);
					} catch (error) {
						console.error("Failed to switch chain:", error);
					}
				}}
				className={`w-full ${className}`}
			>
				Change network
			</LiftedButton>
		</div>
	);
}
