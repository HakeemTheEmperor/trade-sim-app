import { Link } from "react-router-dom";
import PercentageChange from "./PercentageChange";

interface TopStockProps {
  symbol: string;
  companyName: string;
  currentPrice: number;
  percentageChange: number;
  logo: string;
}

function TopStock({
  symbol,
  companyName,
  currentPrice,
  percentageChange,
  logo,
}: TopStockProps) {
  return (
    <Link to={`/market/stock/${symbol}`}>
      <li className="min-w-50 p-3 min-h-50 rounded-xl transparent_light text-white flex flex-col justify-around items-center">
        <div className="flex">
          <img
            src={logo}
            alt={`${symbol} logo`}
            className="w-12 h-12 mr-2"
          />
          <div className="flex flex-col">
            <span className="font-semibold ">{companyName}</span>
            <span className="text-gray-300">{symbol}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>${currentPrice.toFixed(2)}</span>
          <PercentageChange percentage={percentageChange} />
        </div>
      </li>
    </Link>
  );
}

export default TopStock;
