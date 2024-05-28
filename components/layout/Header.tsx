"use client";
import { useEffect, useState } from "react";
import AuthButton from "../AuthButton";
import { Logo } from "../branding/logo";
import SideDrawer from "./SideDrawer";

const Header = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setAccount(user);
  }, [account]);

  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full container p-3 flex justify-between items-center">
        <SideDrawer isSmallScreen />
        <Logo text="Arttribute" />
        {account && <p className="text-sm text-foreground">{account}</p>}
        <AuthButton
          action={account ? "Disconnect" : "Connect"}
          setAccount={setAccount}
        />
      </div>
    </nav>
  );
};

export default Header;
