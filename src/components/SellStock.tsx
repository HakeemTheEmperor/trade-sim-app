import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStockData,
  fetchStockQuantity,
  sellStockUser,
} from "../functions/stockService";
import PercentageChange from "./PercentageChange";
import QuantityInput from "./QuantityInput";
import { WalletProp } from "../mockData/Data";
import { fetchUserWallets } from "../functions/walletService";
import MainButton from "./MainButton";

function SellStock() {
  const { stockSymbol } = useParams();
  const [stockData, setStockData] = useState<any>(null);
  const [quantityOwned, setQuantityOwned] = useState<number | null>(null);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [wallets, setWallets] = useState<WalletProp[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<WalletProp | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sellStock = async () => {
    setError(null);

    if (!selectedWallet) {
      setError("Please select a wallet.");
      return;
    }

    if (!stockSymbol) {
      setError("Stock symbol is missing.");
      return;
    }

    if (!sellQuantity || sellQuantity <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (!quantityOwned) {
      setError("Error getting quantity owned");
      return;
    }
    if (sellQuantity > quantityOwned) {
      setError("You do not have enough stocks to sell.");
      return;
    }

    const requestBody = {
      wallet_id: String(selectedWallet.id),
      symbol: stockSymbol,
      quantity: sellQuantity,
    };
    try {
      const response = await sellStockUser(requestBody);
      setMessage(response.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!stockSymbol) return;

    const fetchData = async () => {
      try {
        const data = await fetchStockData(stockSymbol);
        if (data) setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data: ", error);
      }
    };
    const fetchQuantity = async () => {
      try {
        const data = await fetchStockQuantity(stockSymbol);
        if (data) setQuantityOwned(data);
      } catch (error) {
        console.error("Error fetching stock quantity: ", error);
      }
    };
    const fetchWallets = async () => {
      try {
        const wallets = await fetchUserWallets();
        if (wallets) setWallets(wallets);
      } catch (error) {
        console.error("Error fetching stock quantity: ", error);
      }
    };

    fetchData();
    fetchQuantity();
    fetchWallets();
  }, [stockSymbol]);

  if (!stockData) return <p className="text-white">Loading company data...</p>;
  if (!wallets) return <p className="text-white">Loading wallets...</p>;
  if (message)
    return (
      <div className="text-white bg-green-400 h-full w-full">
        <p>{message}</p>
      </div>
    );
  return (
    <div className="flex flex-col main_text items-center">
      <div className="my-3 p-2 flex justify-end  w-full">
        {message && (
          <div className="text-white fixed bg-green-400 h-full w-full">
            <p>{message}</p>
          </div>
        )}
        <select
          className="block w-64
             p-2 mt-2 border rounded-md bg-green-600  text-white"
          value={selectedWallet ? selectedWallet.id : ""}
          onChange={(e) => {
            const selectedId = parseInt(e.target.value, 10);
            const wallet = wallets.find((w) => w.id === selectedId) || null;
            setSelectedWallet(wallet);
          }}
        >
          <option
            value=""
            disabled
            className="text-gray-300"
          >
            Select a wallet
          </option>
          {/* Default placeholder */}
          {wallets.length > 0 ? (
            wallets.map((wallet) => (
              <option
                key={wallet.id}
                value={wallet.id}
              >
                {wallet.currency} - ${wallet.balance.toFixed(2)}
              </option>
            ))
          ) : (
            <option
              value=""
              disabled
            >
              No wallets available
            </option>
          )}
        </select>
      </div>
      <div className="flex flex-col  items-center justify-center">
        <img
          src={stockData.image}
          alt={`${stockData.symbol} logo`}
          className="w-15 h-15"
        />
        <p className="font-bold mt-4 text-xl">{stockData.company_name}</p>
        <p className="font-bold text-sm text-gray-400">{stockData.symbol}</p>
      </div>
      <div className="transparent_light mt-2 rounded-lg p-3 flex items-center justify-between min-h-30 w-11/12">
        <p className="text-3xl font-thin w-1/2 items-start">
          ${stockData.price.current_price}
        </p>
        <div className="font-light w-1/2 items-center  flex justify-end gap-3">
          <p>{quantityOwned ? quantityOwned : 0} units</p>
          <PercentageChange percentage={stockData.price.percentage_change} />
        </div>
      </div>
      <div className="mt-3 transparent_light w-full rounded-lg p-2">
        <p className="text-center text-lg">
          Please specify how many units you intend to sell?
        </p>
        <div className="flex justify-center">
          <QuantityInput
            value={sellQuantity}
            onChange={setSellQuantity}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <MainButton
          text="Sell"
          Click={() => sellStock()}
        />
      </div>
    </div>
  );
}

export default SellStock;
