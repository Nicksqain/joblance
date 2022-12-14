import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  dayjs.extend(relativeTime);
  // EFFECT
  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/user?userId=" + friendId);

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <>
      <div className="min-dialog-photo">
        <img src={user?.image} alt="" />
      </div>

      <div className="min-dialog-content">
        <div className="min-dialog-header">
          <div className="min-dialog-name">{user?.name}</div>
          <div className="min-dialog-date">Вчера</div>
        </div>

        <div className="min-dialog-footer">
          <div className="min-dialog-text-preview">
            {conversation?.lastmessage}
          </div>
          {/* <div className="min-dialog-date">pin</div> */}
        </div>
      </div>
    </>
  );
};

export default Conversation;
