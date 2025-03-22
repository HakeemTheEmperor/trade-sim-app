import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LearnPage from "./pages/LearnPage";
import Market from "./pages/Market";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/learn"
          element={<LearnPage />}
        />
        <Route
          path="/market"
          element={<Market />}
        />
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
