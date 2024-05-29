import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useMagicContext } from "./providers/MagicProvider";
import { useAuth } from "./providers/AuthProvider";

interface Props {
  action: "Connect" | "Disconnect";
}

const AuthButton = ({ action }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const { magic } = useMagicContext();
  const { setAccount } = useAuth();

  const connect = useCallback(async () => {
    if (!magic) return;
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      setDisabled(false);
      console.log("Logged in user:", accounts[0]);
      localStorage.setItem("user", accounts[0].toLowerCase());
      setAccount(accounts[0].toLowerCase());
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  const disconnect = useCallback(async () => {
    if (!magic) return;
    try {
      setDisabled(true);
      await magic.wallet.disconnect();
      localStorage.removeItem("user");
      setDisabled(false);
      setAccount(null);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled}
      onClick={action == "Connect" ? connect : disconnect}
      className="-ml-10 lg:m-0"
    >
      {disabled ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : action}
    </Button>
  );
};

export default AuthButton;
