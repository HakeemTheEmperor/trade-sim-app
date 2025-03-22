import { useState } from "react";
import numbro from "numbro";
import "../index.css";
import PercentageChange from "./PercentageChange";
import SecondaryButton from "./SecondaryButton";
import PriceFluctuationChart from "./PriceFluctuationChart";
import { chartData, StockIntroProp, companyData } from "../mockData/Data";

function StockIntro({
  symbol,
  image,
  company_name,
  percentage_change,
  current_price,
}: StockIntroProp) {
  return (
    <div className="flex flex-col w-full md:w-1/2 gap-2 drop-shadow-xl py-3 rounded-md mb-2">
      <img
        src={image}
        alt={`${symbol} logo`}
        className="w-15 h-15 p-1"
      />
      <p className="flex flex-col">
        <span className="font-bold mr-2 text-xl">{symbol}</span>
        <span>{company_name}</span>
      </p>
      <p className="flex gap-4">
        <span className="p-1">${current_price.toFixed(2)}</span>
        <PercentageChange percentage={percentage_change} />
      </p>
    </div>
  );
}

function StockView() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sentences = companyData.description
    .split(/(?<=\.)\s+/)
    .filter((sentence) => sentence.trim() !== "");
  const TRUNCATE_LENGTH = 100;
  const TRUNCATE_SENTENCES = 3;
  const truncatedDescription =
    companyData.description.length > TRUNCATE_LENGTH
      ? `${companyData.description.slice(0, TRUNCATE_LENGTH)}...`
      : companyData.description;
  const shortenedDescription =
    sentences.length > TRUNCATE_SENTENCES
      ? sentences.slice(0, TRUNCATE_SENTENCES).join(" ") + "..."
      : companyData.description;
  const marketCap = numbro(companyData.market_cap).format({
    average: true,
    mantissa: 2,
  });
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
              className="ml-2 text-blue-400 hover:text-blue-300 focus:outline-none"
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
      </div>

      <div className="border-t-2 mb-3 pt-4 flex justify-evenly">
        <SecondaryButton
          text="Buy"
          Click={() => console.log("Hello World")}
        />
        <SecondaryButton
          text="Sell"
          Click={() => console.log("Hello World")}
        />
      </div>
    </div>
  );
}

export default StockView;
