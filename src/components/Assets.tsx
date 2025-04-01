import { useEffect, useState } from "react";
import { UserStockItem } from "../mockData/Data";
import AssetItem from "./AssetItem";
import { fetchUserStock } from "../functions/stockService";
import { NavLink } from "react-router-dom";

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
    <div className="text-white my-8 min-h-32 border-y-2 py-3">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold p-3">Assets</h3>
        <NavLink to="/portfolio/userstocks">
          <p className=" h-full flex items-center justify-center text-green-600 p-3">
            view all &rarr;
          </p>
        </NavLink>
      </div>
      {userStocks.length > 0 ? (
        <div className="flex gap-6 w-full overflow-x-scroll p-3 min-h-5">
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
      ) : (
        <p className="italic">Stocks you purchase will appear here</p>
      )}
    </div>
  );
}

export default Assets;
