import PercentageChange from "./PercentageChange";
import { userStock, UserStockItem } from "../mockData/Data";

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
          <span className="text-lg">{quantity}</span> Units
        </p>
      </div>
    </div>
  );
}

function Assets() {
  return (
    <div className="text-white my-8">
      <h3 className="text-2xl font-bold p-3">Assets</h3>
      <div className="flex gap-6 w-full overflow-x-scroll p-3">
        {userStock.map((stock) => (
          <AssetItem
            key={stock.id}
            id={stock.id}
            symbol={stock.symbol}
            company_name={stock.company_name}
            image={stock.image}
            quantity={parseFloat(stock.quantity)}
            price={stock.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Assets;
