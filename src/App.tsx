import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LearnPage from "./pages/LearnPage";
import Market from "./pages/Market";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="learn"
              element={<LearnPage />}
            />
            <Route
              path="market"
              element={<Market />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
