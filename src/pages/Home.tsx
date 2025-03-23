import Assets from "../components/Assets";
import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import Portfolio from "../components/Portfolio";
import StockList from "../components/StockList";
import TopNav from "../components/TopNav";
import { stockData } from "../mockData/Data";

function Home() {
  return (
    <>
      <TopNav />
      <Main>
        <Portfolio />
        <Assets />
        <StockList
          heading="Watchlist"
          stockData={stockData.slice(0, 4)}
        />
      </Main>
      <BottomNav />
    </>
  );
}

export default Home;
