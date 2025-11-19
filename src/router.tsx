import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { AuthGaurd } from "./AuthGaurd";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <AuthGaurd>
        <App />
      </AuthGaurd>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
]);
