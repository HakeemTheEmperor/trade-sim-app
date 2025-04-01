import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/welcome"
        replace
      />
    );
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if (isTokenExpired) {
      console.log("Expired");
      localStorage.removeItem("token"); // Clear invalid token
      localStorage.removeItem("user");
      return (
        <Navigate
          to="/welcome"
          replace
        />
      );
    }
    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("token"); // Invalid token case
    localStorage.removeItem("user");
    return (
      <Navigate
        to="/welcome"
        replace
      />
    );
  }
}

export default ProtectedRoute;
