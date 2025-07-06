import { Navigate } from "react-router-dom";

export const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" />;
  }

  // Not logged in → allow access to signup/signin
  return children;
};
