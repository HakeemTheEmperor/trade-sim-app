import { useEffect, useState } from "react";
import "../index.css";
import PercentageChange from "./PercentageChange";
import SecondaryButton from "./SecondaryButton";
import PriceFluctuationChart from "./PriceFluctuationChart";
import { StockIntroProp } from "../mockData/Data";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchStockData,
  fetchStockPriceHistory,
  fetchStockQuantity,
} from "../functions/stockService";
import {
  formatMarketCap,
  shortenDescription,
  truncateDescription,
} from "../functions/utils";
import InactiveButton from "./InactiveButton";

function StockIntro({
  symbol,
  image,
  company_name,
  percentage_change,
  current_price,
}: StockIntroProp) {
  return (
    <div className="flex  w-full gap-3 drop-shadow-xl py-3 rounded-md mb-2">
      <div className="flex items-center gap-2 w-1/2">
        <img
          src={image}
          alt={`${symbol} logo`}
          className="w-15 h-15 p-1"
        />
        <p className="flex flex-col">
          <span className="font-bold mr-2 text-xl">{symbol}</span>
          <span>{company_name}</span>
        </p>
      </div>
      <p className="flex gap-2 w-1/2 h-full items-center justify-center">
        <span className="p-1">${current_price.toFixed(2)}</span>
        <PercentageChange percentage={percentage_change} />
      </p>
    </div>
  );
}

function StockView() {
  const { stockSymbol } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const TRUNCATE_LENGTH = 100;

  const handleBuy = async () => {
    if (stockSymbol) {
      navigate(`/buy/${stockSymbol}`);
    }
  };

  const handleSell = async () => {
    if (stockSymbol) {
      navigate(`/sell/${stockSymbol}`);
    }
  };

  useEffect(() => {
    if (!stockSymbol) return;

    const fetchData = async () => {
      try {
        const data = await fetchStockData(stockSymbol);
        if (data) setCompanyData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const fetchQuantity = async () => {
      try {
        const data = await fetchStockQuantity(stockSymbol);
        if (data) setQuantity(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const fetchChart = async () => {
      try {
        const history = await fetchStockPriceHistory(stockSymbol);
        if (history) setChartData(history);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
    fetchChart();
    fetchQuantity();
  }, [stockSymbol]);

  if (!companyData) return <p>Loading company data...</p>;
  if (!chartData) return <p>Loading chart...</p>;
  const marketCap = formatMarketCap(companyData.market_cap);
  const sentence = companyData.description;
  const shortenedDescription = shortenDescription(sentence);
  const truncatedDescription = truncateDescription(sentence);

  return (
    <div className="flex flex-col main_text">
      <StockIntro
        symbol={companyData.symbol}
        current_price={companyData.price.current_price}
        percentage_change={companyData.price.percentage_change}
        company_name={companyData.company_name}
        image={companyData.image}
      />
      <PriceFluctuationChart data={chartData} />
      <div className="mb-3 border-t-2">
        <h3 className="text-2xl text-white font-bold mt-4">About</h3>
        <p className="text-gray-400">
          {isExpanded ? shortenedDescription : truncatedDescription}
          {companyData.description.length > TRUNCATE_LENGTH && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-blue-400 hover:text-blue-300 focus:outline-none cursor-pointer"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
      </div>
      <div className="border-t-2 mb-3">
        <h3 className="text-2xl text-white font-bold my-3">Details</h3>
        <div className="flex flex-col mb-4">
          <p className="text-gray-400">Market Cap:</p>
          <p className="text-2xl font-bold">${marketCap}</p>
        </div>
        <div className="flex flex-col mb-4">
          <p className="text-gray-400">Industry:</p>
          <p className="text-2xl font-bold">{companyData.industry}</p>
        </div>
        <div className="flex flex-col mb-4">
          <p className="text-gray-400">Sector:</p>
          <p className="text-2xl font-bold">{companyData.sector}</p>
        </div>
        {quantity ? (
          <div className="flex flex-col mb-4">
            <p className="text-gray-400">Quantity owned:</p>
            <p className="text-2xl font-bold">{quantity} units</p>
          </div>
        ) : (
          <p className="text-white italic font-light text-center">
            You do not have this stock
          </p>
        )}
      </div>
      <div className="border-t-2 mb-3 pt-4 flex justify-evenly">
        <SecondaryButton
          text="Buy"
          Click={handleBuy}
        />
        {quantity ? (
          <SecondaryButton
            text="Sell"
            Click={handleSell}
          />
        ) : (
          <InactiveButton
            text="Sell"
            Click={() => console.log("Hello World")}
          />
        )}
      </div>
    </div>
  );
}

export default StockView;
