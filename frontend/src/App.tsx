import { useState } from "react";
import { BazaarProducts, FilterParams } from "./utils/types";
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
  page("/login", <Loginpage />, "Login"),
  page("/sign-up", <Signuppage />, "Signup"),
  page("/terms", <Terms />, "Terms Of Service"),
  page("/privacy", <Privacy />, "Privacy Policy"),
  page("/forgot-password", <ForgotPassword />, "Forgot Password"),
  page("/guest", <Guestpage />, "Guest"),
  page("/account", <Accountpage />, "Account"),
]);

const App = () => {
  const [filters, setFilters] = useState<FilterParams>({
    buyPriceFilter: { value: 0, comparison: ">=" },
    sellPriceFilter: { value: 0, comparison: ">=" },
    sellVolumeFilter: { value: 0, comparison: ">=" },
    buyVolumeFilter: { value: 0, comparison: ">=" },
    weekBuyTransactionVolumeFilter: { value: 0, comparison: ">=" },
    weekSellTransactionVolumeFilter: { value: 0, comparison: ">=" },
    profitFilter: { value: 0, comparison: ">=" },
    profitMarginFilter: { value: 0, comparison: ">=" },
  });

  const [filteredProducts, setFilteredProducts] = useState<
    BazaarProducts[] | null
  >(null);

  // useEffect(() => {
  //   const fetchFilteredProducts = async () => {
  //     const hypixel = Hypixel.getInstance();
  //     const filtered = await hypixel.bazaarProducts();
  //     console.log(filtered);
  //     setFilteredProducts(filtered);
  //   };

  //   fetchFilteredProducts();
  // }, [filters]);

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
