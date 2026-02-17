"use client";

import React, {
	createContext,
	useContext,
	ComponentType,
	AnchorHTMLAttributes,
	FC,
	ReactNode,
} from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
	children?: React.ReactNode;
};

type LinkContextType = {
	Link: ComponentType<LinkProps>;
};

// Default to regular anchor tags
const defaultLink: ComponentType<LinkProps> = ({
	href,
	children,
	...props
}) => (
	<a href={href} {...props}>
		{children}
	</a>
);

const LinkContext = createContext<LinkContextType>({
	Link: defaultLink,
});

export const useLinkComponent = () => {
	const context = useContext(LinkContext);

	return context.Link;
};

export const LinkProvider: FC<{
	Link: ComponentType<LinkProps>;
	children: ReactNode;
}> = ({ Link, children }) => {
	return (
		<LinkContext.Provider value={{ Link }}>{children}</LinkContext.Provider>
	);
};
