import { useEffect, useState } from "react";
import PercentageChange from "./PercentageChange";
import { fetchPortfolio } from "../functions/stockService";

function formatNumber(num: number): string {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function Portfolio() {
  const [portfolioValue, setPortfolioValue] = useState<string>("0.00");
  const [profitLossPercentage, setProfitLossPercentage] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const walletBalance = user.wallets[0].balance;

  useEffect(() => {
    async function loadPortfolio() {
      const data = await fetchPortfolio();
      if (data) {
        setPortfolioValue(
          formatNumber(Number(data.portfolio_value) + Number(walletBalance))
        );
        setProfitLossPercentage(data.profit_loss_percentage);
      }
    }
    loadPortfolio();
  }, []);
  return (
    <div className="py-15 transparent_light rounded-3xl shadow-xl p-2 text-white flex justify-between">
      <div className="w-full flex flex-col justify-center items-start pl-3 gap-2">
        <span className="text-gray-400 text-md">My Portfolio</span>
        <span className="text-3xl">${portfolioValue}</span>
      </div>
      <div className="w-full flex flex-col justify-center items-end pr-3 gap-2">
        <span>Change:</span>
        <PercentageChange percentage={profitLossPercentage} />
        <span>${formatNumber(walletBalance)}</span>
      </div>
    </div>
  );
}

export default Portfolio;
export { formatNumber };
