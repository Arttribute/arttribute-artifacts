import { Logo } from "../branding/logo";
import { Button } from "../ui/button";
import SideDrawer from "./SideDrawer";

const AuthButton = () => {
  return (
    <Button size="sm" variant="outline" className="-ml-10 lg:m-0">
      Connect Wallet
    </Button>
  );
};

const Header = () => {
  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full container p-3 flex justify-between items-center">
        <SideDrawer isSmallScreen />
        <Logo text="Arttribute" />
        <AuthButton />
      </div>
    </nav>
  );
};

export default Header;
