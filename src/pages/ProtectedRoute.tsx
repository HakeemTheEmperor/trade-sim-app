import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { fetchCurrentUser } from "../functions/authService";

function ProtectedRoute() {
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    // The token is an HttpOnly cookie we can't read, so ask the backend whether
    // the session is valid.
    fetchCurrentUser()
      .then((user) => {
        if (active) setIsAuthed(!!user);
      })
      .catch(() => {
        if (active) setIsAuthed(false);
      });
    return () => {
      active = false;
    };
  }, [location]);

  if (isAuthed === null) return <Spinner />;

  return isAuthed ? <Outlet /> : <Navigate to="/welcome" replace />;
}

export default ProtectedRoute;
