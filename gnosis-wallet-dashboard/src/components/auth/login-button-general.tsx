"use client";

import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import LiftedButton from "../LiftedButton/LiftedButton";
import { ButtonShell } from "./button-shell";
import { App } from "../../interface/app";

interface LoginButtonProps {
  app: App;
  status: "CONNECTED" | "LOADING" | "UNSUPPORTED_CHAIN" | "NOT_CONNECTED";
  label?: string;
  rightIcon?: ReactNode;
}

export const LoginButtonGeneral = ({
  app,
  status,
  label = "Sign In",
  rightIcon,
}: LoginButtonProps) => {
  const className =
    app === "fund"
      ? "bg-primary-orange"
      : app === "stacks"
      ? "bg-primary-blue"
      : "bg-primary-jade";

  const { openChainModal } = useChainModal();

  if (status === "CONNECTED") return null;

  if (status === "LOADING") return <ButtonShell />;

  if (status === "UNSUPPORTED_CHAIN") {
    return (
      <div className="[&>*]:w-full">
        <LiftedButton
          onClick={() => openChainModal?.()}
          className={`w-full ${className}`}
        >
          Change network
        </LiftedButton>
      </div>
    );
  }

  return (
    <CustomLoginButton
      label={label}
      rightIcon={rightIcon}
      className={className}
    />
  );
};

interface CustomLoginButtonProps {
  label?: string;
  rightIcon?: ReactNode;
  className: string;
}

function CustomLoginButton({
  className,
  label = "Sign In",
  rightIcon,
}: CustomLoginButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";

        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === "authenticated");

        if (connected) return null;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="[&>*]:w-full"
          >
            <LiftedButton
              onClick={openConnectModal}
              rightIcon={rightIcon}
              className={`w-full ${className}`}
            >
              {label}
            </LiftedButton>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
