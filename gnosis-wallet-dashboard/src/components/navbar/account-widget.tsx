"use client";

import {
	ArrowUpRightIcon,
	CopyIcon,
	GraphIcon,
	UserCircleIcon,
	WalletIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { UseEnsNameReturnType } from "wagmi";
import { GetEnsNameReturnType } from "@wagmi/core";
import { Body } from "../typography/Typography";
import { truncateAddress } from "../../utils/truncate-address";
import { copyToClipboard } from "../../utils/copy-to-clipboard";
import { Logo } from "../Logo";
import LogoutButton from "./log-out";
import { App } from "../../interface/app";
import { appsConfig } from "../../utils/app";
import { useBreadBalance } from "../../hooks/use-bread-balance";
import { Address } from "viem";
import NavAccountWidgetItem from "./account-widget-item";
import { FormattedDecimalNumber } from "../typography/formatted-dec-num";

const GNOSIS_LINK = "https://gnosisscan.io/address/";

export interface NavAccountDetailsProps {
	userAddress: Address;
	ensNameResult: UseEnsNameReturnType<GetEnsNameReturnType> | { 
		data: string | undefined; 
		isLoading: boolean; 
		isError: boolean;
	};
	className?: string;
	app: App;
	widgetItems?: ReactNode;
	actionItems?: ReactNode;
}

const NavAccountDetails = ({
	className,
	userAddress,
	ensNameResult,
	app,
	widgetItems,
	actionItems,
}: NavAccountDetailsProps) => {
	const { BREAD } = useBreadBalance({ address: userAddress });

	const appIconColor = appsConfig[app].text;

	return (
		<section
			className={clsx(
				"bg-paper-2 p-5 flex flex-col gap-4 w-full max-w-md",
				className
			)}
		>
			<NavAccountWidgetItem
				I={UserCircleIcon}
				appIconColor={appIconColor}
				label={ensNameResult.data || truncateAddress(userAddress || "")}
			>
				<button
					className="text-surface-grey"
					disabled={!ensNameResult.data && !userAddress}
					onClick={() =>
						copyToClipboard(ensNameResult.data || userAddress || "")
					}
				>
					<CopyIcon size={24} />
				</button>
				<a
					href={GNOSIS_LINK + (userAddress || "")}
					className="text-surface-grey"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ArrowUpRightIcon size={24} />
				</a>
			</NavAccountWidgetItem>
			<NavAccountWidgetItem
				I={WalletIcon}
				appIconColor={appIconColor}
				label="Bread Balance"
			>
				<>
					<Logo size={24} />
					<Body>
						<FormattedDecimalNumber value={BREAD} />
					</Body>
				</>
			</NavAccountWidgetItem>
			{widgetItems}
			<NavAccountWidgetItem
				I={GraphIcon}
				appIconColor={appIconColor}
				label="Network"
			>
				<div className="flex items-center justify-center">
					<img
						src="/gnosis_icon.svg"
						alt=""
						width={24}
						height={24}
						className="mr-2"
					/>
					<Body className="font-bold">Gnosis chain</Body>
				</div>
			</NavAccountWidgetItem>
			{actionItems}
			<LogoutButton className="mt-1" />
		</section>
	);
};

export default NavAccountDetails;
