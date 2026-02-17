import { Icon } from "@phosphor-icons/react";
import { ReactNode } from "react";
import clsx from "clsx";
import { Body } from "../typography/Typography";

const NavAccountWidgetItem = ({
  I,
  label,
  children,
  appIconColor,
}: {
  I: Icon;
  appIconColor: string;
  label: string;
  children: ReactNode;
}) => {
  return (
    <li className={clsx("flex items-center justify-start gap-2")}>
      <I size={24} className={appIconColor} />
      <Body className="mr-auto ml-2">{label}</Body>
      <div className="flex items-center justify-center gap-2">
        {children}
      </div>
    </li>
  );
};

export default NavAccountWidgetItem;
