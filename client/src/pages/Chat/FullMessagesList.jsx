import React, { useContext, useState, useEffect, useRef, memo } from "react";
import { AuthContext } from "../../context/auth";
import SocketContext from "../../context/socketContext";

// LIBS
import dayjs from "dayjs";
import axios from "axios";
import { io } from "socket.io-client";

const FullMessagesList = ({
  // PROPS
  messages,
  currentDialog,
  setMessages,
  conversations,
  setConversations,
  arrival,
  setArrival,
}) => {
  // CONTEXT
  const [auth, setAuth] = useContext(AuthContext);
  const socket = useContext(SocketContext);
  // STATE
  const [value, setValue] = useState("");
  // REF
  const scrollRef = useRef();

  useEffect(() => {
    arrival &&
      currentDialog?.members.includes(arrival.sender) &&
      setMessages([...messages, arrival]);
  }, [arrival]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  // console.log("current", currentDialog);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages", {
        conversationId: currentDialog?._id,
        sender: auth?.user?._id,
        body: value,
      });

      const receiverId = currentDialog.members.find(
        (member) => member !== auth?.user?._id
      );

      socket.emit("sendMessage", {
        senderId: auth?.user?._id,
        receiverId,
        message: data,
      });
      setMessages([...messages, data]);

      // обновленный список диалогов
      // const newConvertations = conversations.map((t) => {
      //   if (t._id === data?.conversationId) {
      //     return data;
      //   }
      //   return t;
      // });

      if (data) {
        // Обновить стейт минидиалога, при добавлении сообщения и очистить инпут
        setConversations((prevState) =>
          prevState.map((item) =>
            item._id === data.conversationId
              ? { ...item, lastmessage: data.body }
              : item
          )
        );
        setValue("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="right">
      <div className="messenger">
        <div className="messenger-header">
          <div className="aboutCurrentDialog">
            {/* Текущий диалог*/}
            <div className="user"></div>
          </div>
        </div>
        <div className="messenger-body">
          {messages.length >= 1 ? (
            messages.map((msg) => {
              return (
                <div
                  ref={scrollRef}
                  className={`message ${
                    msg.sender === auth?.user?._id ? "own-message" : ""
                  }`}
                  key={msg._id}
                >
                  <span>{msg.body}</span>
                  <div className="timeFromNow">
                    {dayjs(msg.createdAt).format("H:mm")}
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p>Сообщений нет?</p>
            </div>
          )}
        </div>
        <div className="messenger-controller">
          {/* PIN includes */}
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Write a message..."
              value={value}
              onChange={handleOnChange}
              type="text"
              name="messenger-controller"
              id=""
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(FullMessagesList);
