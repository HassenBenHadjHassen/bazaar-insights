import { useEffect } from "react";
import { useAuth } from "../../hooks/AuthHook";
import { Role } from "../../types/authTypes";

const Popunder = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== Role.PRO) {
      const script = document.createElement("script");
      script.src =
        "//plainsenlargecoronation.com/7f/b5/de/7fb5de07862442ac82771bdeb1af5dbc.js";
      script.type = "text/javascript";
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [user]);

  return <></>;
};

export default Popunder;
