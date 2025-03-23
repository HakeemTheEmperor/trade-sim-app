import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      localStorage.removeItem("token"); // Clear invalid token
      localStorage.removeItem("user");
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("token"); // Invalid token case
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
}

export default ProtectedRoute;
