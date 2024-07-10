"use client";

import AuthButton from "../AuthButton";
import { Logo } from "../branding/logo";
import SideDrawer from "./SideDrawer";
import { useAuth } from "../providers/AuthProvider";
import { useMinipay } from "../providers/MinipayProvider";
import BalanceButton from "../BalanceButton";

const Header = () => {
  const { account } = useAuth();
  const { minipay } = useMinipay();

  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full container p-3 flex justify-between items-center">
        <SideDrawer isSmallScreen />
        <Logo text="Arttribute Artifacts" />
        {account && (
          <>
            <p className="text-sm text-foreground hidden md:flex">{account}</p>
          </>
        )}
        {minipay ? (
          <BalanceButton balance={minipay.balance} />
        ) : (
          <AuthButton action={account ? "Disconnect" : "Connect"} />
        )}
      </div>
    </nav>
  );
};

export default Header;
