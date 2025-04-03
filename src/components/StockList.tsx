import StockItem from "./StockItem";
import { StockDataShort, StockListProp } from "../mockData/Data";
import { useEffect, useState } from "react";
import { fetchAllStocks } from "../functions/stockService";
import { Link } from "react-router-dom";

function StockList({ heading }: StockListProp) {
  const [data, setData] = useState<StockDataShort[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await fetchAllStocks(1, "symbol", "asc");
        const cutData = result.stocks.slice(0, 4);
        setData(cutData);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchStocks();
  }, []);
  if (!data) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="main_text text-xl p-2 antialiased font-bold">
          {heading}
        </h2>
        <Link to={`/market/stocks/all`}>
          <p className="text-green-600 p-2">view all &rarr;</p>
        </Link>
      </div>
      <ul className="flex flex-col list-none py-4">
        {data.map((stock) => (
          <StockItem
            key={stock.id}
            symbol={stock.symbol}
            companyName={stock.company_name}
            currentPrice={stock.price.current_price}
            percentageChange={stock.price.percentage_change}
            logo={stock.image}
          />
        ))}
      </ul>
    </>
  );
}

export default StockList;
