import Assets from "../components/Assets";
import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import Portfolio from "../components/Portfolio";

import StockList from "../components/StockList";
import TopNav from "../components/TopNav";

function Home() {
  return (
    <>
      <TopNav />
      <Main>
        <Portfolio />
        <Assets />
        <StockList />
      </Main>
      <BottomNav />
    </>
  );
}

export default Home;
