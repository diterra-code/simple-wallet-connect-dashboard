"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { type Address } from "viem";
import { Body } from "../typography/Typography";
import { truncateAddress } from "../../utils/truncate-address";
import { CaretDownIcon } from "@phosphor-icons/react";
import NavAccountDetails, { NavAccountDetailsProps } from "./account-widget";
import { App } from "../../interface/app";
import { appsConfig } from "../../utils/app";

export interface AccountMenuProps
	extends Pick<NavAccountDetailsProps, "widgetItems" | "ensNameResult" | "actionItems"> {
	userAddress: Address;
	app: App;
}

const AccountMenu = ({
	userAddress,
	ensNameResult,
	app,
	widgetItems,
	actionItems
}: AccountMenuProps) => {
	return (
		<NavigationMenu.Root className="relative">
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger className="group w-full">
						<Body
							bold
							className={
								"w-full flex items-center justify-center gap-2.5 truncate text-ellipsis py-3 px-6 bg-paper-2 border border-surface-ink font-bold"
							}
						>
							{ensNameResult.data ||
								truncateAddress(userAddress || "")}
							<span className={appsConfig[app].text}>
								<CaretDownIcon />
							</span>
						</Body>
					</NavigationMenu.Trigger>
					<NavigationMenu.Content className="w-max">
						<NavAccountDetails
							className="border w-full md:w-screen md:max-w-110.75 md:bg-paper-main md:border-paper-2"
							userAddress={userAddress}
							ensNameResult={ensNameResult}
							app={app}
							widgetItems={widgetItems}
							actionItems={actionItems}
						/>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			</NavigationMenu.List>
			<NavigationMenu.Viewport className="nav-account-menu absolute top-14 right-0 z-20 left-0 md:left-auto" />
		</NavigationMenu.Root>
	);
};

export default AccountMenu;
