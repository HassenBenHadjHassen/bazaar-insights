import { useAuth } from "../../hooks/AuthHook";

const Accountpage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Accountpage;
