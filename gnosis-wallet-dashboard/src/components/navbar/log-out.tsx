"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useDisconnect } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import LiftedButton from "../LiftedButton/LiftedButton";
import { useAuthProvider } from "../../context/lib";

const LogoutButton = ({ className }: { className?: string }) => {
	const authProvider = useAuthProvider();

	const { disconnect: wagmiDisconnect } = useDisconnect();
	const { logout: privyLogout } = usePrivy();

	const handleLogout = () => {
		if (authProvider === "privy") {
			privyLogout();
		} else {
			wagmiDisconnect();
		}
	};

	return (
		<div className={clsx("lifted-button-container", className)}>
			<LiftedButton
				preset="burn"
				rightIcon={<SignOutIcon />}
				onClick={handleLogout}
			>
				Sign out
			</LiftedButton>
		</div>
	);
};

export default LogoutButton;
