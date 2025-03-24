import { useEffect, useState } from "react";
import { UserStockItem } from "../mockData/Data";
import AssetItem from "./AssetItem";
import { fetchUserStock } from "../functions/stockService";

function Assets() {
  const [userStocks, setUserStocks] = useState<UserStockItem[]>([]);
  useEffect(() => {
    async function getStocks() {
      const stocks = await fetchUserStock();
      setUserStocks(stocks.slice(0, 4));
    }

    getStocks();
  }, []);
  return (
    <div className="text-white my-8">
      <h3 className="text-2xl font-bold p-3">Assets</h3>
      <div className="flex gap-6 w-full overflow-x-scroll p-3">
        {userStocks.map((stock) => (
          <AssetItem
            key={stock.id}
            id={stock.id}
            symbol={stock.symbol}
            company_name={stock.company_name}
            image={stock.image}
            quantity={stock.quantity}
            price={stock.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Assets;
