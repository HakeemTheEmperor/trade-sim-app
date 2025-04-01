import { useEffect, useState } from "react";
import { UserStockItem } from "../mockData/Data";
import { fetchUserStock } from "../functions/stockService";
import UserStock from "./UserStock";

function UserStocks() {
  const [userStocks, setUserStocks] = useState<UserStockItem[]>([]);
  useEffect(() => {
    async function getStocks() {
      const stocks = await fetchUserStock();
      setUserStocks(stocks);
    }
    getStocks();
  }, []);
  console.log(userStocks);
  return (
    <>
      <div className="flex justify-center">
        <h2 className="main_text text-xl p-2 antialiased font-bold">
          User Stocks
        </h2>
      </div>
      {userStocks.length > 0 ? (
        <ul className="flex flex-col list-none py-4 gap-2">
          {userStocks.map((stock) => (
            <UserStock
              key={stock.id}
              id={stock.id}
              symbol={stock.symbol}
              company_name={stock.company_name}
              price={stock.price}
              image={stock.image}
              quantity={stock.quantity}
            />
          ))}
        </ul>
      ) : (
        <p className="italic text-white py-4">
          You have not purchased any stock yet.
        </p>
      )}
    </>
  );
}

export default UserStocks;
