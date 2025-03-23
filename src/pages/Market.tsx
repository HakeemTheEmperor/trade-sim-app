import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import SearchBar from "../components/SearchBar";

import StockList from "../components/StockList";
import TopNav from "../components/TopNav";
import { stockData } from "../mockData/Data";

function Market() {
  return (
    <>
      <TopNav />
      <Main>
        <SearchBar />
        <StockList
          heading="Available Stocks"
          stockData={stockData}
        />
      </Main>
      <BottomNav />
    </>
  );
}

export default Market;
