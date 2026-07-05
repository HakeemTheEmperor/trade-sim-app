import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { clearSession, isTokenValid } from "../functions/authToken";

function ProtectedRoute() {
  const location = useLocation();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const valid = isTokenValid();
      if (!valid) clearSession();
      setIsValid(valid);
    };

    check();

    // Re-check when another tab logs in/out (or the token is cleared globally
    // by the API client on a 401), so auth state doesn't go stale.
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, [location]);

  if (isValid === null) return <Spinner />;

  return isValid ? <Outlet /> : <Navigate to="/welcome" replace />;
}

export default ProtectedRoute;
