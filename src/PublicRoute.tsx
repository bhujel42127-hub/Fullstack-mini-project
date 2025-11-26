import { Navigate } from "react-router-dom";
import type { AuthProps } from "./Props";

export const PublicRoute = ({ children }: AuthProps) => {
  //   console.log("reached");

  const isLogged = localStorage.getItem("userId");

  if (isLogged) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
