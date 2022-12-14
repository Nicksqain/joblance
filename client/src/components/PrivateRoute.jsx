import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import { toast } from "react-hot-toast";
import LoadingToRedirect from "./LoadingToRedirect";
// import io from "socket.io-client";
import { AuthContext } from "../context/auth";
const PrivateRoute = () => {
  // Context
  const [auth, setAuth] = useContext(AuthContext);

  // State
  const [loading, setLoading] = useState(true);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login page
  function RedirectToLogin() {
    return setTimeout(() => {
      toast.error("Authorization required!");
      navigate("/login", { state: { from: location } }, { replace: true });
    }, Number(process.env.REACT_APP_REDIRECT_DELAY));
  }

  // Auth checking from server side
  const authCheck = async () => {
    try {
      const { data } = await axios.get(`auth-check`).catch(function (error) {
        console.log(error);
        toast.error(error.toJSON());
        if (error.response) {
          console.log(error.toJSON());
          RedirectToLogin();
        } else if (error.request) {
          // Запрос был сделан, но ответ не получен
          // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
          // http.ClientRequest в node.js
          console.log(error.toJSON());
        } else {
          // Произошло что-то при настройке запроса, вызвавшее ошибку
          console.log("Error", error.message);
        }
      });
      if (!data.ok || data === undefined) {
        RedirectToLogin();
      } else {
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (auth) {
      authCheck();
    } else {
      let timer = RedirectToLogin();
      return () => {
        clearTimeout(timer);
      };
    }
  }, [auth]);
  return loading ? <LoadingToRedirect /> : <Outlet />;
};

export default PrivateRoute;
