import "./App.css";
import BottomNav from "./components/BottomNav";
import StockList from "./components/StockList";
import TopNav from "./components/TopNav";

function App() {
  return (
    <>
      <TopNav />
      <StockList />
      <BottomNav />
    </>
  );
}

export default App;
