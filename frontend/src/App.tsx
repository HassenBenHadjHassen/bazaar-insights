import { useEffect, useState } from "react";
import { Hypixel } from "./Data/Hypixel";
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

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<Homepage />}
        pageName="Homepage"
        headerButtonText={"Login/Signup"}
        buttonLink="/login"
      />
    ),
  },
  {
    path: "/login",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<Loginpage />}
        pageName="Login"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
  },
  {
    path: "/sign-up",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<Signuppage />}
        pageName="Signup"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
  },

  {
    path: "/terms",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<Terms />}
        pageName="Terms Of Service"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
  },
  {
    path: "/privacy",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<Privacy />}
        pageName="Privacy Policy"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
  },
  {
    path: "/forgot-password",
    errorElement: (
      <Template
        Page={<RouteError />}
        pageName="Error"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
    element: (
      <Template
        Page={<ForgotPassword />}
        pageName="Forgot Password"
        headerButtonText="Login/Signup"
        buttonLink="/login"
      />
    ),
  },
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
        <RouterProvider router={router} />
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
