import { CoinsIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNum } from "@/lib/utils";
import Link from "next/link";
import { useMinipay } from "./providers/MinipayProvider";

const currencies: Token[] = ["cUSD", "USDC", "USDT"];

const BalanceButton = ({ balance }: { balance: string }) => {
  const { currency, setCurrency } = useMinipay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {" "}
          <CoinsIcon className="mr-2 h-4 w-4" />
          {`${formatNum(parseFloat(balance))} ${currency}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Currency Token</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={(val) => setCurrency(val as Token)}
        >
          {currencies.map((currency) => (
            <DropdownMenuRadioItem key={currency} value={currency}>
              {currency}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <Button asChild className="w-full">
          <Link href="https://minipay.opera.com/add_cash">Add Cash</Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BalanceButton;
