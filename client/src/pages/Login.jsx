import axios from "axios";
import React, { useState, useContext } from "react";
// Hooks
import { useLocation, useNavigate } from "react-router-dom";
// Components
import Input from "../components/NavBar/forms/Input";
import Button from "../components/NavBar/forms/Button";
import "./login.scss";
import { toast } from "react-hot-toast";
// Helpers
import { saveInLocalStorage } from "../helpers/auth";
// Context
import { AuthContext } from "../context/auth";

const Login = () => {
  // Notify
  const notify = (text) => toast.error(text, { duration: 2000 });

  // Context
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useContext(AuthContext);
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`${process.env.REACT_APP_API}/signin`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        setAuth(data);
        // Save in localstorage
        saveInLocalStorage("auth", data);
        // toast
        toast.success("Successfully logged in");
        console.log("Successfully logged in", data);
        console.log(fromPage);
        setTimeout(() => {
          setLoading(false);
          navigate(fromPage);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="col-md-6 offset-md-3">
        <div className="">
          <h1 className="fw-bold">Login</h1>
          <form>
            <Input
              type="email"
              value={email}
              label="Email"
              help="We'll never share your email with anyone else."
              setValue={setEmail}
            />
            <Input
              type="password"
              value={password}
              label="Password"
              setValue={setPassword}
            />

            <Button
              handleSubmit={handleSubmit}
              email={email}
              password={password}
              loading={loading}
            />
          </form>
        </div>

        {/* <pre>{JSON.stringify(email)}</pre>
          <pre>{JSON.stringify(password)}</pre> */}
      </div>
    </div>
  );
};

export default Login;
