import { ReactNode } from "react";

interface ChipProps {
	size?: "small" | "regular";
	children: ReactNode;
	icon?: boolean;
	className?: string;
}

const Chip = ({
	size = "small",
	icon,
	className = "",
	children,
}: ChipProps) => {
	let extraClass = "";
	if (size === "small") {
		if (icon) {
			extraClass = "p-2";
		} else {
			extraClass = "py-1 px-4";
		}
	} else {
		if (icon) {
			extraClass = "p-3";
		} else {
			extraClass = "py-3 px-6";
		}
	}

	return (
		<div
			className={`border border-surface-ink hover:border-[#EA5817] disabled:border-surface-grey disabled:border-2 flex items-center justify-center gap-2.5 bg-paper-main ${extraClass} ${className}`}
		>
			{children}
		</div>
	);
};

export default Chip;
