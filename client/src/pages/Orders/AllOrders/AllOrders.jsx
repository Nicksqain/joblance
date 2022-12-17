import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/auth";

import Order from "./Order/Order";

const AllOrders = () => {
  // CONTEXT
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className="all-orders">
      <Order role={auth?.user?.status} />
      <Order role={auth?.user?.status} />
    </div>
  );
};

export default AllOrders;
