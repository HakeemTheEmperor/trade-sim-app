import SearchBar from "../components/SearchBar";

import StockList from "../components/StockList";
import { stockData } from "../mockData/Data";

function Market() {
  return (
    <>
      <SearchBar />
      <StockList
        heading="Available Stocks"
        stockData={stockData.slice(0, 4)}
      />
      <StockList
        heading="Your Watchlist"
        stockData={stockData.slice(0, 4)}
      />
    </>
  );
}

export default Market;
