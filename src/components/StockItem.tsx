import { Link } from "react-router-dom";
import PercentageChange from "./PercentageChange";

interface StockItemProps {
  symbol: string;
  companyName: string;
  currentPrice: number;
  percentageChange: number;
  logo: string;
}

function StockItem({
  symbol,
  companyName,
  currentPrice,
  percentageChange,
  logo,
}: StockItemProps) {
  return (
    <Link to={`/market/stock/${symbol}`}>
      <li className="flex justify-between w-full mb-2 transparent_light rounded-md p-4 main_text shadow">
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
        <div className="flex flex-col">
          <span>${currentPrice.toFixed(2)}</span>
          <PercentageChange percentage={percentageChange} />
        </div>
      </li>
    </Link>
  );
}

export default StockItem;
