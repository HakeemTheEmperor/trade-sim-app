import { useEffect, useState } from "react";
import PercentageChange from "./PercentageChange";
import { fetchPortfolio } from "../functions/stockService";
import { fetchUserWallets } from "../functions/walletService";
import { WalletProp } from "../mockData/Data";

function formatNumber(num: number): string {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Portfolio() {
  const [portfolioValue, setPortfolioValue] = useState<string>();
  const [profitLossPercentage, setProfitLossPercentage] = useState<number>(0);
  const [wallet, setWallet] = useState<WalletProp | null>(null);
  const walletBalance = wallet?.balance;

  useEffect(() => {
    async function fetchWalletsAndPortfolio() {
      const wallets = await fetchUserWallets();
      if (wallets.length > 0) {
        setWallet(wallets[0]);

        // Fetch portfolio **after** setting wallet
        const data = await fetchPortfolio();
        if (data) {
          setPortfolioValue(
            formatNumber(
              Number(data.portfolio_value) + Number(wallets[0].balance)
            )
          );
          setProfitLossPercentage(data.profit_loss_percentage);
        }
      }
    }
    fetchWalletsAndPortfolio();
  }, []);

  if (!wallet) {
    return <p className="text-white">Loading...</p>;
  }
  if (!portfolioValue) {
    return <p className="text-white">Loading...</p>;
  }
  return (
    <div className="py-15 transparent_light rounded-3xl shadow-xl p-2 text-white flex justify-between">
      <div className="w-full flex flex-col justify-center items-start pl-3 gap-2">
        <span className="text-gray-400 text-md">My Portfolio</span>
        <span className="text-3xl">${portfolioValue}</span>
      </div>
      <div className="w-full flex flex-col justify-center items-end pr-3 gap-2">
        <span>Change:</span>
        <PercentageChange percentage={profitLossPercentage} />
        <span>${formatNumber(walletBalance ?? 0)}</span>
      </div>
    </div>
  );
}

export default Portfolio;
export { formatNumber };
