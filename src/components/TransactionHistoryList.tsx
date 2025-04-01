import { useEffect, useState } from "react";
import { TransactionHistory, WalletProp } from "../mockData/Data";
import { fetchUserWallets } from "../functions/walletService";
import { fetchUserTransactionHistory } from "../functions/transactionService";
import TransactionItem from "./TransactionItem";
import SecondaryButton from "./SecondaryButton";
import InactiveButton from "./InactiveButton";

function TransactionHistoryList() {
  const [history, setHistory] = useState<TransactionHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [wallets, setWallets] = useState<WalletProp[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<WalletProp | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const wallets = await fetchUserWallets();
        if (wallets) setWallets(wallets);
      } catch (error: any) {
        console.error("Error fetching wallets: ", error);
        setError(error.message);
      }
    };
    const fetchHistory = async () => {
      try {
        if (!selectedWallet) return;
        const result = await fetchUserTransactionHistory(
          selectedWallet.id,
          selectedWallet.currency,
          page,
          10
        );
        setHistory(result.transactions);
        setTotalPages(result.pages);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchWallets();
    fetchHistory();
  }, [selectedWallet, page]);
  if (!wallets) return <p className="text-white">Loading wallets...</p>;
  if (!history) return <p className="text-white">Loading history...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="flex flex-col text-white">
      <div className="flex justify-between items-center w-full my-2">
        <h3 className="font-bold text-xl">Transaction History</h3>
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
      {history.length > 0 ? (
        <ul className="flex flex-col list-none py-4">
          {history.map((h) => (
            <TransactionItem
              key={h.id}
              {...h}
            />
          ))}
        </ul>
      ) : (
        <p className="italic py-4">
          When you make transactions, they'll show up here
        </p>
      )}

      {totalPages > 1 ? (
        <div className="flex justify-center items-center space-x-4 mt-4">
          {page === 1 ? (
            <InactiveButton text="Previous" />
          ) : (
            <SecondaryButton
              text="Previous"
              Click={() => setPage(page - 1)}
            />
          )}
          <span className="px-4 py-2 text-white">
            {page} / {totalPages}
          </span>

          {page >= totalPages ? (
            <InactiveButton text="Next" />
          ) : (
            <SecondaryButton
              text="Next"
              Click={() => setPage(page + 1)}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default TransactionHistoryList;
