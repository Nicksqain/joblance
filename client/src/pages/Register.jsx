import axios from "axios";
import React, { useState, useContext } from "react";
// Hooks
import { useNavigate } from "react-router-dom";
// Components
import Input from "../components/NavBar/forms/Input";
import Button from "../components/NavBar/forms/Button";
import ListGroup from "../components/ui/ListGroup";
import toast, { Toaster } from "react-hot-toast";
// Helpers
import { saveInLocalStorage } from "../helpers/auth";
// Context
import { AuthContext } from "../context/auth";
import { useEffect } from "react";

const Register = () => {
  // Notify
  const notify = (text) => toast.error(text, { duration: 2000 });

  // CONTEXT
  const [auth, setAuth] = useContext(AuthContext);

  // STATE
  // Состояние выбора ListGroup
  const [status, setStatus] = useState(null);

  // #Инпуты

  // Чтение почты
  const [email, setEmail] = useState("");
  // Чтение пароля и его подтверждения
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Чтение Имени
  const [name, setName] = useState("");
  // Состояние лоадера авторизации
  const [loading, setLoading] = useState(false);

  // HOOKS
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      console.log("Context=>", auth);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (status === null || status === undefined) {
        notify("Вы не выбрали свою роль");
        setLoading(false);
        return;
      }
      if (password !== confirm) {
        notify("Passwords do not match!");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(`${process.env.REACT_APP_API}/signup`, {
        name,
        email,
        password,
        status,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      } else {
        setAuth(data);

        saveInLocalStorage("auth", data);
        toast.success("Succesfully registered");
        console.log("Succesfully registered", data);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
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
          <h1 className="fw-bold mb-3 text-center">Register</h1>

          <ListGroup setValue={setStatus} horizontal selectable>
            <div selectvalue="freelancer">Я исполнитель</div>
            <div selectvalue="orderer">Я заказчик</div>
          </ListGroup>
          {/* Дебаггинг статуса */}
          {/* <button onClick={(el) => console.log(status)}>check</button> */}
          <form className="form">
            <Input type="text" value={name} label="Name" setValue={setName} />
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
            <Input
              type="password"
              value={confirm}
              label="Confirm password"
              setValue={setConfirm}
            />
            <Button
              handleSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              loading={loading}
            />
          </form>

          <Toaster />
          {/* <pre>{JSON.stringify(email)}</pre>
          <pre>{JSON.stringify(password)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
