import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth = () => {
  const [tab, setTab] = useState("login");
  return (
    <div>
      {
        {
          login: <Login changeTab={() => setTab("register")} />,
          register: <Register changeTab={() => setTab("login")} />,
        }[tab]
      }
    </div>
  );
};

export default Auth;
