import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Tab from "../../components/ui/Tabs/Tab";
import Tabs from "../../components/ui/Tabs/Tabs";
import { AuthContext } from "../../context/auth";
import AllOrders from "./AllOrders/AllOrders";
import "./orders.scss";
const Orders = () => {
  // CONTEXT
  const [auth, setAuth] = useContext(AuthContext);

  //   STATE
  const [freelancer, setFreelancer] = useState(false);
  const [orderer, setOrderer] = useState(false);

  useEffect(() => {
    // CHECKING STATUS
    switch (auth?.user?.status) {
      case "freelancer":
        setFreelancer(true);
        break;
      case "orderer":
        setOrderer(true);
        break;
      default:
        console.log("qq");
        break;
    }
  }, [auth?.user?.status]);

  return (
    <div>
      <div className="orders min-container">
        <div className="orders-search">
          {freelancer && (
            <>
              <span>Найти задание для выполнения заказа</span>
              <button>Find a task</button>
            </>
          )}
          {orderer && (
            <>
              <span>Создайте заказ и выберите исполнителя</span>
              <button>Find a freelancer</button>
            </>
          )}
        </div>
      </div>
      <Tabs>
        <Tab title="All orders">
          <AllOrders />
        </Tab>
        <Tab title="In progress">В процессе</Tab>
      </Tabs>
    </div>
  );
};

export default Orders;
