import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import "./Accountpage.css";

const Accountpage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="account">
      <header className="account_header">
        <h1>Account Settings</h1>
      </header>
      <div className="account_content">
        <div className="account_info">
          <h2>User Information</h2>
          <p>
            <strong>Name:</strong> {user?.fullName || "Guest"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "Not available"}
          </p>
          <p>
            <strong>Role:</strong> {user?.role || "ACCOUNT"}
          </p>
        </div>
        <button className="account_logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Accountpage;
