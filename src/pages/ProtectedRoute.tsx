import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

function ProtectedRoute() {
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsTokenValid(false);

      try {
        const decoded: any = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          console.log("Token Expired");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return setIsTokenValid(false);
        }
        return setIsTokenValid(true);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return setIsTokenValid(false);
      }
    };
    checkToken();
  }, [location]);

  if (isTokenValid === null) return <Spinner />; // Or a loading spinner

  return isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate
      to="/welcome"
      replace
    />
  );
}

export default ProtectedRoute;
