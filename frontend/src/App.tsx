import "./App.css";
import Template from "./components/Template/Template";
import Homepage from "./pages/HomePage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loginpage from "./pages/Loginpage/Loginpage";
import React from "react";
import Signuppage from "./pages/Signuppage/Signuppage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import RouteError from "./components/RouteError/RouteError";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Policy/Policy";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Guestpage from "./pages/GuestView/Guestpage";
import { AuthProvider } from "./context/AuthContext";
import Accountpage from "./pages/Accountpage/Accountpage";
import Dashboardpage from "./pages/Dashboardpage/Dashboardpage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const page = (
  path: string,
  Page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  pageName: string
) => {
  return {
    path,
    errorElement: <Template Page={<RouteError />} pageName="Error" />,
    element: <Template Page={Page} pageName={pageName} />,
  };
};

export const router = createBrowserRouter([
  page("/", <Homepage />, "Homepage"),
  page(
    "/login",
    <ProtectedRoute requiresAuth={false}>
      <Loginpage />
    </ProtectedRoute>,
    "Login"
  ),
  page(
    "/sign-up",
    <ProtectedRoute requiresAuth={false}>
      <Signuppage />
    </ProtectedRoute>,
    "Signup"
  ),
  page("/terms", <Terms />, "Terms Of Service"),
  page("/privacy", <Privacy />, "Privacy Policy"),
  page(
    "/forgot-password",
    <ProtectedRoute requiresAuth={false}>
      <ForgotPassword />
    </ProtectedRoute>,
    "Forgot Password"
  ),
  page(
    "/guest",
    <ProtectedRoute requiresAuth={false}>
      <Guestpage />
    </ProtectedRoute>,
    "Guest"
  ),
  page(
    "/account",
    <ProtectedRoute requiresAuth={true}>
      <Accountpage />
    </ProtectedRoute>,
    "Account"
  ),
  page(
    "/dashboard",
    <ProtectedRoute requiresAuth={true}>
      <Dashboardpage />
    </ProtectedRoute>,
    "Dashboard"
  ),
]);

const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
