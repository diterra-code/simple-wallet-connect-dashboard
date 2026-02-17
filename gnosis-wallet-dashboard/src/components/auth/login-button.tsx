"use client";

import {
	LoginButtonPrivy,
	type LoginButtonPrivyProps,
} from "./login-button-privy";
import { LoginButtonGeneral } from "./login-button-general";
import { useAuthProvider } from "../../context/lib";

export const LoginButton = ({
	label = "Sign In",
	isProd,
	...props
}: LoginButtonPrivyProps) => {
	const authProvider = useAuthProvider();

	if (authProvider === "privy") {
		return (
			<LoginButtonPrivy
				{...props}
				isProd={isProd}
				label={label}
			/>
		);
	}

	return (
		<LoginButtonGeneral {...props} label={label} />
	);
};
