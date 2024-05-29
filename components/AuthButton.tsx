import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useMagicContext } from "./providers/MagicProvider";
import { useAuth } from "./providers/AuthProvider";
import LoadingButton from "./LoadingButton";

interface Props {
  action: "Connect" | "Disconnect";
}

const AuthButton = ({ action }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { magic } = useMagicContext();
  const { setAccount } = useAuth();

  const connect = useCallback(async () => {
    if (!magic) return;
    try {
      setIsLoading(true);
      const accounts = await magic.wallet.connectWithUI();
      setIsLoading(false);
      console.log("Logged in user:", accounts[0]);
      localStorage.setItem("user", accounts[0].toLowerCase());
      setAccount(accounts[0].toLowerCase());
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  const disconnect = useCallback(async () => {
    if (!magic) return;
    try {
      setIsLoading(true);
      await magic.wallet.disconnect();
      localStorage.removeItem("user");
      setIsLoading(false);
      setAccount(null);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  return (
    <LoadingButton
      variant="outline"
      size="sm"
      className="-ml-10 lg:m-0"
      isLoading={isLoading}
      onClick={action == "Connect" ? connect : disconnect}
    >
      {action}
    </LoadingButton>
  );
};

export default AuthButton;
