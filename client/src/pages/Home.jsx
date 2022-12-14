import React, { useContext } from "react";
import { useEffect } from "react";
import Header from "../components/Home/Header";
import { AuthContext } from "../context/auth";
import { RoleContext } from "../context/role";

const Home = () => {
  const [auth, setAuth, hasRole] = useContext(AuthContext);
  const [roleCheck] = useContext(RoleContext);
  useEffect(() => {
    if (auth) {
      console.log(auth?.user);
    }
  }, [auth]);

  return (
    <div>
      <Header />
      <h1>Homessddsdsd page</h1>
    </div>
  );
};

export default Home;
