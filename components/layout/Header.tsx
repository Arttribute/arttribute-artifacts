"use client";
import { useEffect, useState } from "react";
import AuthButton from "../AuthButton";
import { Logo } from "../branding/logo";
import SideDrawer from "./SideDrawer";
import { useAuth } from "../providers/AuthProvider";

const Header = () => {
  const { account } = useAuth();

  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full container p-3 flex justify-between items-center">
        <SideDrawer isSmallScreen />
        <Logo text="Arttribute" />
        {account && <p className="text-sm text-foreground">{account}</p>}
        <AuthButton action={account ? "Disconnect" : "Connect"} />
      </div>
    </nav>
  );
};

export default Header;
