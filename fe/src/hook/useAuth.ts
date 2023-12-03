import React from "react";
import { POST, GET } from "../utils/fetchMethod";
import {  getCookie } from "../utils/utils";

const useAuth = () => {
  const [state, setState] = React.useState({
    loading: false,
  });

  const { loading } = state;
  const handleLogin = async (data: object) => {
    try {
      setState((p) => ({ ...p, loading: true }));
      const res = await POST("login", data).then((res) => res.json());
      if (res.status === 200) {
        localStorage.setItem("auth", JSON.stringify(res));
        setState((p) => ({ ...p, loading: false }));
        window.location.reload();
      }
    } catch (error) {
      setState((p) => ({ ...p, loading: false }));
    }
  };
  const handleRegister = async (data: object) => {
    try {
      setState((p) => ({ ...p, loading: true }));
      const res = await POST("register", data);
      if (res.status === 200) {
        setState((p) => ({ ...p, loading: false }));
        handleLogin({ email: data["email"], password: data["password"] });
      }
    } catch (error) {
      setState((p) => ({ ...p, loading: false }));
    }
  };
  const handleLogout = async () => {
    console.log(getCookie('access_token'))
    try {
      const res = await GET("logout", getCookie("access_token"));
      console.log(res);
    } catch (error) {
      error;
    }
  };
  return { handleLogin, loading, handleRegister, handleLogout };
};

export default useAuth;
