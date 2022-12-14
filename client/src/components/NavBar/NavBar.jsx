import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { romoveFromLocalStorage } from "../../helpers/auth";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import "./navbar.scss";
import Dropdown from "../ui/Dropdown";

const NavBar = () => {
  // Context
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    setAuth(null);
    romoveFromLocalStorage();
  };
  return (
    <>
      <nav className="navbar">
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Create a task</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        {auth !== null && auth !== undefined ? (
          <div className="profile-tools">
            {/* 1 Alerts */}
            <NavLink to="">Биржа</NavLink>
            <Dropdown
              className="alerts"
              title={<FontAwesomeIcon icon={faBell} />}
              header="Уведомления"
              center
            >
              <NavLink to="">Профиль</NavLink>
              <NavLink to="/orders">Мои заказы</NavLink>
            </Dropdown>
            {/* 2 Chat */}
            <NavLink to="/messages">
              <FontAwesomeIcon icon={faMessage} />
            </NavLink>

            {/* 3 Profile */}
            <Dropdown title={<FontAwesomeIcon icon={faUser} />} center>
              <NavLink to={`/user/${auth.user.name}`}>Профиль</NavLink>
              <NavLink to="/orders">Мои заказы</NavLink>
              <NavLink to="/login" onClick={logout}>
                Выйти
              </NavLink>
            </Dropdown>
          </div>
        ) : (
          <div className="profile-tools">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
