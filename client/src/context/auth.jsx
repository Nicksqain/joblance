import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { getFromLocalStorage, romoveFromLocalStorage } from "../helpers/auth";
import SocketContext from "./socketContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Hooks
  const [auth, setAuth] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (auth) {
      console.log(socket?.id);
      socket.emit("addUser", auth?.user?._id);
      socket.on("getUsers", (users) => {
        console.log("ЮЗЕРЫ:", users);
      });
      socket.emit("addAuthUserId", { auth: { id: auth?.user?._id } });

      socket.on("userAccountChange", (arg) => {
        console.log(arg.msg);
        setAuth(null);
      });
      // socket.on("connect", (art) => {
      //   console.log(auth?.user?._id);

      // });

      console.log(socket);
    }
  }, [auth, socket]);
  // Axios
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  // axios.interceptors.request.use(function (config) {
  //   // Здесь можете сделать что-нибудь с перед отправкой запроса
  //   return config;
  // }, function (error) {
  //   // Сделайте что-нибудь с ошибкой запроса
  //   return Promise.reject(error);
  // });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.status === 403) {
        console.log("401 error");
        setAuth(null);
        romoveFromLocalStorage();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    let data = getFromLocalStorage("auth");
    if (data) {
      setAuth(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
