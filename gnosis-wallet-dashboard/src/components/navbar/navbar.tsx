"use client";

import { ReactNode, useRef } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { NavSolidarityApps, NavSolidarityAppsDesktop } from "./solidarity-apps";
import { App } from "../../interface/app";
import { useLinkComponent } from "../../context/link";
import { Logo, LogoProps } from "../Logo";
import { appsConfig } from "../../utils/app";
import AccountSection from "./account-section";
import { NavAccountDetailsProps } from "./account-widget";

interface NavbarProps
	extends Pick<NavAccountDetailsProps, "widgetItems" | "actionItems"> {
	app: App;
	children: ReactNode;
	className?: string;
}

export function Navbar({
	app,
	children,
	className = "",
	widgetItems,
	actionItems
}: NavbarProps) {
	const Link = useLinkComponent();
	const menuRef = useRef<HTMLDivElement>(null);
	const appConfig = appsConfig[app];
	const logoColor: LogoProps["color"] =
		app === "net" ? "jade" : app === "stacks" ? "blue" : "orange";
	const logoText =
		app === "net"
			? "Safety Net"
			: app === "stacks"
			? "Stacks"
			: "Solidarity fund";

	const toggleMenu = (close = false) => {
		if (close) {
			menuRef.current?.classList.remove("translate-x-0!");

			return;
		}

		menuRef.current?.classList.toggle("translate-x-0!");
	};

	return (
		<div
			className={`relative py-2.5 flex items-center justify-between ${className}`}
		>
			<Link href="/">
				<Logo size={24} color={logoColor} className="md:hidden" />
				<span className="hidden md:block lg:text-2xl">
					<Logo text="BREAD" size={24} color={logoColor} />
				</span>
			</Link>
			<NavSolidarityAppsDesktop app={app} label={logoText} />
			<button
				onClick={() => toggleMenu()}
				// className="ml-auto relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group md:hidden"
				className={`ml-auto relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group md:hidden ${appConfig.text}`}
				aria-label="Toggle menu"
			>
				<ListIcon size={32} />
			</button>
			<div
				ref={menuRef}
				className="bg-paper-main fixed overflow-y-scroll top-0 left-0 z-50 h-screen w-screen py-2.5 px-6 transition-transform translate-x-full md:static md:h-auto md:w-auto md:translate-x-0 md:py-0 md:px-0 md:flex md:items-center md:justify-end md:overflow-x-visible md:overflow-y-visible md:transition-none md:z-auto"
			>
				<div className="flex items-center justify-between mb-6 md:hidden">
					<Link href="/">
						<Logo color={logoColor} text={logoText} />
					</Link>
					<button
						className={`z-60 h-8 w-8 ml-auto block md:hidden ${appConfig.text}`}
						onClick={() => toggleMenu(true)}
					>
						<XIcon size={32} />
					</button>
				</div>
				<div onClick={() => toggleMenu(true)}>{children}</div>
				<NavSolidarityApps
					showTitle
					showSelected
					rearranged
					current={app}
					className="mt-6 md:hidden"
				/>
				<AccountSection
					app={app}
					widgetItems={widgetItems}
					actionItems={actionItems}
				/>
			</div>
		</div>
	);
}
