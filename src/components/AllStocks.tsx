import { useState, useEffect } from "react";
import { StockDataShort } from "../mockData/Data";
import { fetchAllStocks } from "../functions/stockService";
import StockItem from "./StockItem";
import SecondaryButton from "./SecondaryButton";
import InactiveButton from "./InactiveButton";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

interface AllStocksProp {
  heading: string;
}

function AllStocks({ heading }: AllStocksProp) {
  const [stockData, setStockData] = useState<StockDataShort[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("symbol");

  useEffect(() => {
    if (!page) return;
    const fetchStocks = async () => {
      try {
        const result = await fetchAllStocks(page, sortBy, sortOrder);
        setTotalPages(result.pages);
        setStockData(result.stocks);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchStocks();
  }, [page, sortBy, sortOrder]);
  if (error) return <p className="text-white">{error}</p>;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="main_text text-xl p-2 antialiased font-bold">
          {heading}
        </h2>
        <HiOutlineAdjustmentsHorizontal
          className="w-5 h-5 text-white cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
      {showFilters && (
        <div className="mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md p-3 z-10">
          <h3 className="text-gray-700 font-semibold mb-2">Filters</h3>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="symbol"
                  checked={sortBy === "symbol"}
                  onChange={() => setSortBy("symbol")}
                  className="form-radio text-blue-500"
                />
                Sort by Symbol
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="company"
                  checked={sortBy === "price"}
                  onChange={() => setSortBy("price")}
                  className="form-radio text-blue-500"
                />
                Sort by price
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="symbol"
                  checked={sortOrder === "asc"}
                  onChange={() => setSortOrder("asc")}
                  className="form-radio text-blue-500"
                />
                Asc &uarr;
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="company"
                  checked={sortOrder === "desc"}
                  onChange={() => setSortOrder("desc")}
                  className="form-radio text-blue-500"
                />
                Desc &darr;
              </label>
            </div>
          </div>
        </div>
      )}
      <ul className="flex flex-col list-none py-4">
        {stockData.map((stock) => (
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
      {/* Pagination Controls */}
      {totalPages > 1 ? (
        <div className="flex justify-center items-center space-x-4 mt-4">
          {page === 1 ? (
            <InactiveButton text="Previous" />
          ) : (
            <SecondaryButton
              text="Previous"
              Click={() => setPage(page - 1)}
            />
          )}
          <span className="px-4 py-2 text-white">
            {page} / {totalPages}
          </span>

          {page >= totalPages ? (
            <InactiveButton text="Next" />
          ) : (
            <SecondaryButton
              text="Next"
              Click={() => setPage(page + 1)}
            />
          )}
        </div>
      ) : null}
    </>
  );
}

export default AllStocks;
