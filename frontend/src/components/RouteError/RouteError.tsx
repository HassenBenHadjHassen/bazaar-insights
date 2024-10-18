import React from "react";
import { useRouteError } from "react-router-dom";
import "./RouteError.css";

const RouteError: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1 className="error-title">Oops! Something went wrong.</h1>
      <p className="error-message">
        {(error as any)?.statusText || (error as any)?.message}
      </p>
      <a href="/" className="error-link">
        Go back to Home
      </a>
    </div>
  );
};

export default RouteError;
