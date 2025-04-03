import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LearnPage from "./pages/LearnPage";
import Market from "./pages/Market";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserStocksPage from "./pages/sub/UserStocksPage";
import StockViewPage from "./pages/sub/StockViewPage";
import BuyStockPage from "./pages/sub/BuyStockPage";
import SellStockPage from "./pages/sub/SellStockPage";
import TestPage from "./pages/TestPage";
import AllStocksPage from "./pages/sub/AllStocksPage";
import TransactionHistoryPage from "./pages/sub/TransactionHistoryPage";
import TransactionViewPage from "./pages/sub/TransactionViewPage";
import LandingPage from "./pages/LandingPage";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect '/' to '/welcome' */}
        <Route
          path="/"
          element={
            <Navigate
              to="/welcome"
              replace
            />
          }
        />

        {/* Landing Page */}
        <Route
          path="/welcome"
          element={<LandingPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              path="portfolio"
              element={<Home />}
            />
            <Route
              path="portfolio/transactions/all"
              element={<TransactionHistoryPage />}
            />
            <Route
              path="portfolio/transaction/:transactionId"
              element={<TransactionViewPage />}
            />
            <Route
              path="portfolio/userstocks"
              element={<UserStocksPage />}
            />
            <Route
              path="learn"
              element={<LearnPage />}
            />

            <Route
              path="test"
              element={<TestPage />}
            />
            <Route
              path="market"
              element={<Market />}
            />
            <Route
              path="market/stocks/all"
              element={<AllStocksPage />}
            />
            <Route
              path="market/buy/:stockSymbol"
              element={<BuyStockPage />}
            />
            <Route
              path="market/sell/:stockSymbol"
              element={<SellStockPage />}
            />
            <Route
              path="market/stock/:stockSymbol"
              element={<StockViewPage />}
            />
            <Route
              path="account"
              element={<Account />}
            />
          </Route>
        </Route>
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
