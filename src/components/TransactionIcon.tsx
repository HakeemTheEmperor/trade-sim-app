import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";

const StockTradeIcon = ({ type }: { type: "BUY" | "SELL" }) => {
  return type === "BUY" ? (
    <MdTrendingUp className="text-green-500 w-15 h-10" />
  ) : (
    <MdTrendingDown className="text-red-500 w-15 h-10" />
  );
};

const WalletTransferIcon = () => (
  <FaExchangeAlt className="text-blue-500 w-15 h-10" />
);

const DepositIcon = () => (
  <AiOutlinePlusCircle className="text-green-500 w-15 h-10" />
);

const WithdrawalIcon = () => (
  <AiOutlineMinusCircle className="text-red-500 w-15 h-10" />
);

function TransactionIcon({
  category,
  type,
}: {
  category: string;
  type: string;
}) {
  switch (category) {
    case "STOCK_TRADE":
      return <StockTradeIcon type={type as "BUY" | "SELL"} />;
    case "WALLET_TRANSFER":
      return <WalletTransferIcon />;
    case "DEPOSIT":
      return <DepositIcon />;
    case "WITHDRAWAL":
      return <WithdrawalIcon />;
    default:
      return null;
  }
}

export default TransactionIcon;
