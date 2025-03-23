import Assets from "../components/Assets";
import Portfolio from "../components/Portfolio";
import StockList from "../components/StockList";
import { stockData } from "../mockData/Data";

function Home() {
  return (
    <>
      <Portfolio />
      <Assets />
      <StockList
        heading="Watchlist"
        stockData={stockData.slice(0, 4)}
      />
    </>
  );
}

export default Home;
