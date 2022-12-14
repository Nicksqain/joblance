import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./users.scss";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    try {
      const { data } = await axios.get("/users");

      if (data) {
        console.log(data);
        setUsers(data);
      }
      // setTask({ ...task, tasks: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {users.map((el) => {
        return (
          <div>
            <img src={el.image} alt="" />
            <p>{el.name}</p>
            <p>{el.role}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
