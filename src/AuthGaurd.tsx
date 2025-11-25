import { Navigate } from "react-router-dom";
import type { AuthProps } from "./Props";

export const AuthGaurd = ({ children }: AuthProps) => {
  const isLogged = localStorage.getItem("userId");

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
