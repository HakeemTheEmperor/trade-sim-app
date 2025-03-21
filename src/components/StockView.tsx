import { useState } from "react";
import numbro from "numbro";
import "../index.css";
import PercentageChange from "./PercentageChange";
import SecondaryButton from "./SecondaryButton";

const data = {
  company_name: "The Goldman Sachs Group, Inc.",
  description:
    "The Goldman Sachs Group, Inc., a financial institution, provides a range of financial services for corporations, financial institutions, governments, and individuals worldwide. It operates through four segments: Investment Banking, Global Markets, Asset Management, and Consumer & Wealth Management. The company's Investment Banking segment provides financial advisory services, including strategic advisory assignments related to mergers and acquisitions, divestitures, corporate defense activities, restructurings, and spin-offs; and middle-market lending, relationship lending, and acquisition financing, as well as transaction banking services. This segment also offers underwriting services, such as equity underwriting for common and preferred stock and convertible and exchangeable securities; and debt underwriting for various types of debt instruments, including investment-grade and high-yield debt, bank and bridge loans, and emerging-and growth-market debt, as well as originates structured securities. Its Global Markets segment is involved in client execution activities for cash and derivative instruments; credit and interest rate products; and provision of equity intermediation and equity financing, clearing, settlement, and custody services, as well as mortgages, currencies, commodities, and equities related products. The company's Asset Management segment manages assets across various classes, including equity, fixed income, hedge funds, credit funds, private equity, real estate, currencies, and commodities; and provides customized investment advisory solutions, as well as invests in corporate, real estate, and infrastructure entities. Its Consumer & Wealth Management segment offers wealth advisory and banking services, including financial planning, investment management, deposit taking, and lending; private banking; and unsecured loans, as well as accepts saving and time deposits. The company was founded in 1869 and is headquartered in New York, New York.",
  id: 30,
  image: "https://images.financialmodelingprep.com/symbol/GS.png",
  industry: "Financial - Capital Markets",
  market_cap: 173350146060,
  price: {
    current_price: 555.4454,
    id: 30,
    percentage_change: -0.047615,
    previous_price: 555.71,
    symbol: "GS",
    updated_at: "2025-03-21T14:43:29.024452+00:00",
  },
  sector: "Financial Services",
  symbol: "GS",
  website: "https://www.goldmansachs.com",
};

interface StockIntroProp {
  symbol: string;
  image: string;
  company_name: string;
  percentage_change: number;
  current_price: number;
}

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
        className="w-20 h-20 p-1"
      />
      <p className="flex flex-col">
        <span className="font-bold mr-2 text-3xl">{symbol}</span>
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
  const sentences = data.description
    .split(/(?<=\.)\s+/)
    .filter((sentence) => sentence.trim() !== "");
  const TRUNCATE_LENGTH = 100;
  const TRUNCATE_SENTENCES = 3;
  const truncatedDescription =
    data.description.length > TRUNCATE_LENGTH
      ? `${data.description.slice(0, TRUNCATE_LENGTH)}...`
      : data.description;
  const shortenedDescription =
    sentences.length > TRUNCATE_SENTENCES
      ? sentences.slice(0, TRUNCATE_SENTENCES).join(" ") + "..."
      : data.description;
  const marketCap = numbro(data.market_cap).format({
    average: true,
    mantissa: 2,
  });
  return (
    <div className="flex flex-col main_text">
      <StockIntro
        symbol={data.symbol}
        current_price={data.price.current_price}
        percentage_change={data.price.percentage_change}
        company_name={data.company_name}
        image={data.image}
      />
      <div className="mb-3 border-t-2">
        <h3 className="text-2xl text-white font-bold mt-4">About</h3>
        <p className="text-gray-400">
          {isExpanded ? shortenedDescription : truncatedDescription}
          {data.description.length > TRUNCATE_LENGTH && (
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
          <p className="text-2xl font-bold">{data.industry}</p>
        </div>
        <div className="flex flex-col mb-4">
          <p className="text-gray-400">Sector:</p>
          <p className="text-2xl font-bold">{data.sector}</p>
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
