import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
