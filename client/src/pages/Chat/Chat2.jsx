import React, { memo } from "react";
import axios from "axios";
import "./chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/chat/chatSlice";
const Chat = () => {
  const dispatch = useDispatch();

  // STATE
  const [conversations, setConversations] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [currentDialog, setCurrentDialog] = useState();
  const [messages, setMessages] = useState([]);
  //   EFFECT
  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get("/api/conversations/" + auth.user._id);
      setConversations(res.data);
    };
    getConversations();
  }, [auth.user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentDialog?._id);
        res === null ? setMessages(null) : setMessages(res.data);

        // setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentDialog]);

  const SearchToggle = () => {
    return (
      <div className="search-toggle">
        <button className="back-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <input placeholder="Search" type="search" name="" id="" />
      </div>
    );
  };
  const MinDialog = memo(({ conversation, currentUser }) => {
    //STATE
    const user = useSelector((state) => state.user.user);

    return (
      <div
        className="min-dialog"
        onClick={() => setCurrentDialog(conversation)}
      >
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              veniam, magni placeat explicabo consectetur, facilis nostrum
              laudantium porro vitae numquam sunt nesciunt iusto ratione
              distinctio!
            </div>
            {/* <div className="min-dialog-date">pin</div> */}
          </div>
        </div>
      </div>
    );
  });
  const MiniMenu = () => {
    return (
      <div className="left">
        <div className="chat-search-block">
          <SearchToggle />
        </div>
        {/* Сообщение */}
        {conversations.map((c) => {
          return (
            <MinDialog key={c._id} conversation={c} currentUser={auth?.user} />
          );
        })}
      </div>
    );
  };
  // Right -------------------------------------------------

  const NoMessagesAlert = () => {
    return <div className="right">Не выбран диалог!</div>;
  };
  const FullMessagesList = memo(() => {
    console.log("Текущий чел", currentDialog);
    return (
      <div className="right">
        <div className="messenger">
          <div className="messenger-header">
            <div className="aboutCurrentDialog">
              {/* Текущий диалог*/}
              <div className="user">{currentDialog?.members[1]}</div>
            </div>
          </div>
          <div className="messenger-body">
            {messages.length === 0 ? (
              <div>
                <p>Сообщений нет!</p>
              </div>
            ) : (
              messages.map((msg) => {
                return (
                  <span className="message" key={msg._id}>
                    {msg.body}
                  </span>
                );
              })
            )}
          </div>
          <div className="messenger-controller">
            {/* PIN includes */}
            <input
              placeholder="Write a message..."
              type="text"
              name="messenger-controller"
              id=""
            />
          </div>
        </div>
      </div>
    );
  });
  const FullMenu = () => {
    return <>{currentDialog ? <FullMessagesList /> : <NoMessagesAlert />}</>;
  };
  return (
    <div className="chat">
      <MiniMenu />
      <FullMenu />
    </div>
  );
};

export default React.memo(Chat);
