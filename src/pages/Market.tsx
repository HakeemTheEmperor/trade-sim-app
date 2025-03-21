import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import StockList from "../components/StockList";
import TopNav from "../components/TopNav";

function Market() {
  return (
    <>
      <TopNav />
      <Main>
        <StockList />
      </Main>
      <BottomNav />
    </>
  );
}

export default Market;
