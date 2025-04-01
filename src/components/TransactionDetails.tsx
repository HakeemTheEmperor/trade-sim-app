import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TransactionDetailProp } from "../mockData/Data";
import { fetchTransactionDetails } from "../functions/transactionService";
import TransactionIcon from "./TransactionIcon";
import { formatDate } from "../functions/utils";

function StockTransactionDetails({
  symbol,
  image,
  quantity,
  currency,
  pps,
  transaction_type,
  wallet,
  id,
}: {
  symbol: string | null;
  image: string | null;
  currency: string;
  quantity: number | null;
  pps: number | null;
  transaction_type: string;
  wallet: number;
  id: number;
}) {
  return (
    <div className="min-h-30 min-w-30 flex flex-col">
      <div className="flex items-center my-4 transparent_light gap-3 md:gap-5 rounded-lg py-4">
        <img
          src={image ? image : undefined}
          alt={`${symbol} logo`}
          className="w-10 h-10"
        />
        <p className="text-white font-bold text-xl">{symbol}</p>
      </div>

      <div className="flex flex-col gap-2 transparent_light rounded-lg py-3 px-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Transaction ID</p>
          <p className="text-white">{id}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Transaction Type</p>
          <p className="text-white">{transaction_type}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Quantity</p>
          <p className="text-white">{quantity} units</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Price-per-share</p>
          <p className="text-white">
            {currency === "USD" ? "$" : "€"}
            {pps}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Wallet ID</p>
          <p className="text-white">{wallet}</p>
        </div>
      </div>
    </div>
  );
}

function TransactionDetails() {
  const { transactionId } = useParams();
  const [tData, setTData] = useState<TransactionDetailProp>();

  useEffect(() => {
    if (!transactionId) return;
    const fetchData = async () => {
      try {
        const data = await fetchTransactionDetails(transactionId);
        if (data) setTData(data);
      } catch (error) {}
    };
    fetchData();
  }, [transactionId]);

  if (!tData) return <p className="text-white">Loading Data</p>;
  return (
    <div className="flex flex-col text-white">
      <div className="flex md:w-1/2 md:justify-between gap-3 md:gap-0">
        <TransactionIcon
          category={tData.transaction_category}
          type={tData.transaction_type}
        />
        <div className="flex flex-col items-start">
          <p className="font-bold text-2xl">
            {tData.currency === "USD" ? "$" : "€"}
            {tData.total_value}
          </p>
          <p className="text-gray-500 text-lg">{tData.transaction_category}</p>
          <p className="text-gray-500 text-lg">{formatDate(tData.timestamp)}</p>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <p className="text-gray-500 text-lg">Details</p>
        {tData.transaction_category === "STOCK_TRADE" && (
          <StockTransactionDetails
            id={tData.id}
            symbol={tData.stockSymbol}
            image={tData.stockImage}
            quantity={tData.quantity}
            pps={tData.pps}
            currency={tData.currency}
            transaction_type={tData.transaction_type}
            wallet={tData.from_wallet_id}
          />
        )}
      </div>
    </div>
  );
}

export default TransactionDetails;
