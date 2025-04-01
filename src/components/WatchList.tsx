import StockItem from "./StockItem";
import { useEffect, useState } from "react";
import { WatchListData } from "../mockData/Data";
import { fetchWatchlist } from "../functions/watchlistService";

function WatchList() {
  const [data, setData] = useState<WatchListData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      try {
        const result = await fetchWatchlist();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchWatchlistItems();
  }, []);
  if (!data) return <p className="text-white">Loading...</p>;
  return (
    <>
      <div className="flex flex-col text-white items-center justify-center min-h-24">
        <h2 className="main_text text-xl p-2 antialiased font-bold">
          My Watchlist
        </h2>
        <p className="italic">
          Put up to 5 stocks in your watchlist to see the details about them
          faster
        </p>
      </div>
      {data.length > 0 ? (
        <ul className="flex flex-col list-none py-4">
          {data.map((stock) => (
            <StockItem
              key={stock.id}
              symbol={stock.symbol}
              companyName={stock.company_name}
              currentPrice={stock.price}
              percentageChange={stock.pc}
              logo={stock.image}
            />
          ))}
        </ul>
      ) : (
        <p className="italic text-white">{error}</p>
      )}
    </>
  );
}

export default WatchList;
