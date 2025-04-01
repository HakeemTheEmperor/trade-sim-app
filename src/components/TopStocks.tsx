import { useEffect, useState } from "react";
import { StockDataShort } from "../mockData/Data";
import { fetchAllStocks } from "../functions/stockService";
import TopStock from "./TopStock";

function TopStocks() {
  const [data, setData] = useState<StockDataShort[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await fetchAllStocks(1, "price", "desc");
        const cutData = result.stocks.slice(0, 4);
        setData(cutData);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchStocks();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="my-2">
      <div className="text-white flex flex-col justify-center items-center">
        <h2 className="text-center text-2xl font-bold">Our Top Stocks</h2>
        <p className="italic text-lg">Our top picks for the week</p>
      </div>
      <ul className="flex overflow-scroll gap-3 list-none py-4">
        {data.map((stock) => (
          <TopStock
            key={stock.id}
            symbol={stock.symbol}
            companyName={stock.company_name}
            currentPrice={stock.price.current_price}
            percentageChange={stock.price.percentage_change}
            logo={stock.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default TopStocks;
