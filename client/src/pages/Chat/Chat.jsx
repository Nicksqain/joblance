import React, { memo } from "react";
import axios from "axios";
import "./chat.scss";

import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../context/auth";
// Redux

// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../redux/slices/chat/chatSlice";
import SearchToggle from "./ShatToggle";
import NoMessagesAlert from "./NoMessagesAlert";
import Conversation from "./Conversation";
import FullMessagesList from "./FullMessagesList";
import SocketContext from "../../context/socketContext";

const Chat = () => {
  // STATE
  const [conversations, setConversations] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentDialog, setCurrentDialog] = useState(null);
  const [arrival, setArrival] = useState(null);
  //   EFFECT
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data);
      setArrival(data.message);
      setConversations((prevState) =>
        prevState.map((item) =>
          item._id === data.message.conversationId
            ? { ...item, lastmessage: data.message.body }
            : item
        )
      );
    });
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get("/api/conversations/" + auth.user._id);
      setConversations(res.data);
    };
    getConversations();
  }, [auth.user._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentDialog) {
        try {
          const res = await axios.get("/api/messages/" + currentDialog?._id);
          res === null || res === undefined
            ? setMessages(null)
            : setMessages(res.data);
          console.log(res.data);
          // setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentDialog]);

  return (
    <div className="chat">
      <div className="left">
        <div className="chat-search-block">
          <SearchToggle />
        </div>
        {/* Сообщение */}
        {conversations.map((c) => {
          return (
            <div
              key={c._id}
              className="min-dialog"
              onClick={() => setCurrentDialog(c)}
            >
              <Conversation conversation={c} currentUser={auth?.user} />
            </div>
          );
        })}
      </div>
      {currentDialog ? (
        <FullMessagesList
          messages={messages}
          currentDialog={currentDialog}
          setMessages={setMessages}
          setConversations={setConversations}
          conversations={conversations}
          arrival={arrival}
          setArrival={setArrival}
        />
      ) : (
        <NoMessagesAlert />
      )}
    </div>
  );
};

export default React.memo(Chat);
