import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TasksContext } from "../../context/tasks";
import { AuthContext } from "../../context/auth";
import { Button, Textarea } from "evergreen-ui";
import io from "socket.io-client";
import LoadingToRedirect from "../LoadingToRedirect";
const CreateTasks = () => {
  const [content, setContent] = useState("");
  const [task, setTask] = useContext(TasksContext);
  const [auth, setAuth] = useContext(AuthContext);

  // useEffect(() => {
  //   const socket = io(
  //     "http://localhost:8000",
  //     {
  //       path: "/socket.io",
  //     },
  //     {
  //       query: {
  //         id: auth.user._id,
  //       },
  //     },
  //     {
  //       reconnection: true,
  //     },
  //     {
  //       auth: {
  //         token: "123",
  //       },
  //     }
  //   );
  //   socket.on("connect", (art) => {
  //     console.log(auth?.user?._id);
  //     socket.emit("addAuthUserId", { auth: { id: auth?.user?._id } });
  //   });
  //   socket.on("userAccountChange", (arg) => {
  //     console.log(arg.msg);
  //     setAuth(null);
  //   });
  //   console.log(socket);
  // }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/tasks/create", { content });
      setTask({ ...task, tasks: [data, ...task.tasks] });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="task-create-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="🌟 Type your task"
          className="task-create-textarea"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button className="task-create-advance-settings">Advance</button>
        <button className="task-create-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateTasks;
