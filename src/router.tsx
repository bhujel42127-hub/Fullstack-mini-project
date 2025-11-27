import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { AuthGaurd } from "./AuthGaurd";
import { PublicRoute } from "./PublicRoute";
import { DefaultLayout } from "./Layout";
import { ChangePassword } from "./pages/ChangePassword";
import { VerifyEmail } from "./pages/EmailVerify";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <PublicRoute>
        <VerifyEmail />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ChangePassword />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <AuthGaurd>
        <DefaultLayout />
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
