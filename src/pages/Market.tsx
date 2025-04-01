import SearchBar from "../components/SearchBar";

import StockList from "../components/StockList";
import TopStocks from "../components/TopStocks";
import WatchList from "../components/WatchList";

function Market() {
  return (
    <>
      <SearchBar />
      <TopStocks />
      <StockList heading="Available Stocks" />
      <WatchList />
    </>
  );
}

export default Market;
