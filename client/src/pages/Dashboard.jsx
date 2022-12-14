import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
// import noimage from "./src/noimage.png";
import "./dashboard.scss";
const Dashboard = () => {
  const dayjs = require("dayjs");
  require("dayjs/locale/ru");
  const [image, setImage] = useState("images/dashboard/noimage.gif");
  const [auth, setAuth] = useContext(AuthContext);
  return (
    <div className="">
      {/* <h3>Dashboard</h3> */}
      <div className="dashboard">
        <div className="header box_in">
          <div className="options">
            <span className="active">{auth?.user?.name}</span>
            <span>Редактировать</span>
          </div>
          <div className="avatar">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="box_in">
          <div className="tab-pane active" id="user1">
            <ul className="usinf">
              <li>
                <div className="ui-c1 profilestat">Никнейм</div>
                <div className="ui-c2 profilestat2">{auth?.user?.name}</div>
              </li>

              <li>
                <div className="ui-c1 profilestat">Зарегистрирован</div>
                <div className="ui-c2 profilestat2">
                  {dayjs(auth?.user?.createdAt).format("MMM DD YYYY, ddd")}
                </div>
              </li>

              <li>
                <div className="ui-c1 profilestat">Группа</div>
                <div className="ui-c2 profilestat2">
                  <b>{auth?.user?.role}</b>
                </div>
              </li>
              <li>
                <div className="ui-c1 profilestat">Статус</div>
                <div className="ui-c2 profilestat2"></div>
              </li>
            </ul>
            <ul className="usinf">
              <li>
                <div className="ui-c1 profilestat">Кол-во публикаций</div>
                <div className="ui-c2 profilestat2">
                  5&nbsp;&nbsp; [{" "}
                  <a href="https://grouppers.kz/user/Admin/news/">
                    Просмотреть все публикации
                  </a>{" "}
                  ]
                </div>
              </li>
              <li>
                <div className="ui-c1 profilestat">Кол-во комментариев</div>
                <div className="ui-c2 profilestat2">
                  3&nbsp;&nbsp; [{" "}
                  <a href="https://grouppers.kz/index.php?do=lastcomments&amp;userid=1">
                    Последние комментарии
                  </a>{" "}
                  ]
                </div>
              </li>
              <li>
                <div className="ui-c1 profilestat">Рейтинг публикаций</div>
                <div className="ui-c2 profilestat2">
                  <span className="ratingtypeplus">4</span>
                </div>
              </li>
              <li>
                <div className="ui-c1 profilestat">Рейтинг комментариев</div>
                <div className="ui-c2 profilestat2">
                  <span className="ratingtypeplus">0</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Link to="/dashboard/tasks" className="btn btn-outline-primary btn-lg">
        Go to board
      </Link>
    </div>
  );
};

export default Dashboard;
