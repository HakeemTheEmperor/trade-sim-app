import { Link } from "react-router-dom";
import { formatDate } from "../functions/utils";
import { TransactionHistory } from "../mockData/Data";
import TransactionIcon from "./TransactionIcon";

function TransactionItem({
  transaction_category,
  transaction_type,
  total_value,
  time,
  quantity,
  stock_symbol,
  price_per_share,
  to_wallet_id,
  id,
}: TransactionHistory) {
  return (
    <Link to={`/portfolio/transaction/${id}`}>
      <li className="text-white transparent_light flex justify-between my-2 p-2">
        <div className="flex items-center gap-1 w-1/2">
          <TransactionIcon
            category={transaction_category}
            type={transaction_type}
          />
          <div>
            <p className="font-bold">{transaction_category}</p>
            <p>{transaction_type}</p>
            <p>{total_value}</p>
          </div>
        </div>
        {transaction_category == "STOCK_TRADE" ? (
          <StockTransaction
            time={time}
            quantity={quantity}
            stock_symbol={stock_symbol}
            price_per_share={price_per_share}
          />
        ) : (
          <WalletTransaction
            time={time}
            to_wallet_id={to_wallet_id}
          />
        )}
      </li>
    </Link>
  );
}

function StockTransaction({
  stock_symbol,
  price_per_share,
  quantity,
  time,
}: {
  stock_symbol: string;
  price_per_share: number;
  quantity: number;
  time: string;
}) {
  const date = formatDate(time);
  return (
    <div className="flex flex-col items-end">
      <p className="text-md font-bold">{stock_symbol}</p>
      <p className="text-sm">{price_per_share}</p>
      <p className="text-sm">{quantity} units</p>
      <p className="text-sm">{date}</p>
    </div>
  );
}

function WalletTransaction({
  to_wallet_id,
  time,
}: {
  to_wallet_id: number | null;
  time: string;
}) {
  const date = formatDate(time);
  return (
    <div className="flex flex-col items-end">
      <p className="text-sm">{to_wallet_id}</p>
      <p className="text-sm">{date}</p>
    </div>
  );
}

export default TransactionItem;
