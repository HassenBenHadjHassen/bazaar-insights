import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiresAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth,
}) => {
  const { isAuthenticated } = useAuth();

  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    return <Navigate to="/login" replace />;
  } else if (!requiresAuth && isAuthenticated) {
    // If the route does not require authentication and the user is authenticated
    return <Navigate to="/dashboard" replace />; // Redirect to the dashboard
  }

  // If neither condition is met, render the children
  return children;
};

export default ProtectedRoute;
