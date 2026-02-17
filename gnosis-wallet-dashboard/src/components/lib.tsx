"use client";

import { createContext, useContext } from "react";
import { Abi, Address } from "viem";
import { App } from "../interface/app";

// interface PrivyAuthProvider {
// 	provider: "privy",
// 	config?: {
// 		appId: string;
// 	}
// }

// interface GeneralAuthProvider {
// 	provider: "general",
// 	config?: {
// 		projectId: string;
// 	}
// }

type AuthProvider = "privy" | "general";

type TokenConfig = {
	BREAD: { address: Address; abi: Abi };
};

type BreadUIKitContextType = {
	isProd: boolean;
	tokenConfig: TokenConfig;
	app: App;
	authProvider: AuthProvider;
};

export const BreadUIKitContext = createContext<
	BreadUIKitContextType | undefined
>(undefined);

export const BreadUIKitProvider = ({
	isProd,
	tokenConfig,
	children,
	app,
	authProvider,
}: {
	isProd: boolean;
	tokenConfig: TokenConfig;
	app: App;
	authProvider: AuthProvider;
	children: React.ReactNode;
}) => {
	if (isProd) {
		tokenConfig.BREAD.address =
			"0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3";
	}

	return (
		<BreadUIKitContext.Provider value={{ isProd, tokenConfig, app, authProvider }}>
			{children}
		</BreadUIKitContext.Provider>
	);
};

export const useBreadUIKitContext = () => {
	const context = useContext(BreadUIKitContext);

	if (!context) {
		throw new Error(
			"useBreadUIKitContext must be used within a BreadUIKitProvider"
		);
	}

	return context;
};

// Convenience hook to get just the auth provider
export const useAuthProvider = () => {
	const context = useBreadUIKitContext();
	return context.authProvider;
};
