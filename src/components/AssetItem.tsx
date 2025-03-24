import PercentageChange from "./PercentageChange";
import { UserStockItem } from "../mockData/Data";

function AssetItem({
  company_name,
  image,
  price,
  quantity,
  symbol,
}: UserStockItem) {
  return (
    <div className="min-w-40 p-3 min-h-40 rounded-xl bg-gray-600 flex justify-between">
      <div>
        <div className="flex gap-2 mb-5">
          <img
            src={image}
            alt={`${symbol} image`}
            className="w-10 h-10"
          />
          <p className="text-sm">{company_name}</p>
        </div>
        <p className="mb-2 text-lg">${price.current_price}</p>
        <PercentageChange percentage={price.percentage_change} />
        <p className="my-2 text-sm">
          <span className="text-lg">{Number(quantity).toFixed(2)}</span> Units
        </p>
      </div>
    </div>
  );
}

export default AssetItem;
