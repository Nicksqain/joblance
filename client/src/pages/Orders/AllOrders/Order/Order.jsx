import React from "react";

import "./order.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
const Order = ({ title }) => {
  return (
    <div className="order">
      <div className="order-header">
        <div className="top">
          <div className="left">
            <div className="order-title">Лендинг на Tilda</div>
            <div className="views">
              <FontAwesomeIcon icon={faEye} /> <span>135</span>
            </div>
          </div>
          <div className="right">
            <div className="price-range">30 000 KZT</div>
          </div>
        </div>
        <div className="bottom">
          <div className="creation-date">Создано 03 октября 2022</div>
        </div>
      </div>
      <div className="order-details"></div>
    </div>
  );
};

export default Order;
