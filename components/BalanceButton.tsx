import { CoinsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { formatNum } from "@/lib/utils";
import Link from "next/link";

const BalanceButton = ({ balance }: { balance: string }) => {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link
        href="https://minipay.opera.com/add_cash"
        className="text-muted-foreground"
      >
        <CoinsIcon className="mr-2 h-4 w-4" />
        {formatNum(parseFloat(balance))} cUSD
      </Link>
    </Button>
  );
};

export default BalanceButton;
