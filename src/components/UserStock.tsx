import PercentageChange from "./PercentageChange";
import { UserStockItem } from "../mockData/Data";
import { formatNumber } from "./Portfolio";
import { Link } from "react-router-dom";

function UserStock({ image, price, quantity, symbol }: UserStockItem) {
  const displayQuantity = formatNumber(quantity);
  return (
    <Link to={`/market/stock/${symbol}`}>
      <div className="w-full py-4 px-2 border-white bg-gray-600 rounded-2xl text-white shadow border-1 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-3 w-1/3">
          <img
            src={image}
            alt={`${symbol} image`}
            className="w-10 h-10"
          />
          <div>
            <p className="font-bold text-gray-300">{symbol}</p>
          </div>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <p>{displayQuantity}</p>
        </div>
        <div className="items-end flex flex-col gap-1 w-1/3 justify-end">
          <p>${price.current_price}</p>
          <PercentageChange percentage={price.percentage_change} />
        </div>
      </div>
    </Link>
  );
}
export default UserStock;
