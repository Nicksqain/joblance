import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./user.scss";
const User = () => {
  let { name } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/user?username=" + name);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="user-page min-container">
      <div className="about-user">
        <div className="header">
          <div className="user-info-avatar">
            <div className="avatar">
              <img src={user?.image} alt="" />
            </div>
            <div className="info">
              <div className="last-activity">
                <span>Last activity: 13:05</span>
              </div>
              <div className="username">{user?.name}</div>
              <div className="email-check">
                <div className="email-check-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <small>Почта подтверждена</small>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="task-list">
            <span>Найди задание для выполнения заказа</span>
            <button>Create a task</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
