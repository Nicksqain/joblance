import axios from "axios";
import { useContext, useEffect } from "react";
import { TasksContext } from "../context/tasks";
import { NavLink } from "react-router-dom";
import CreateTasks from "../components/tasks/CreateTasks";
import TaskList from "../components/tasks/TaskList";
import UpdateTask from "../components/tasks/UpdateTask";

const Tasks = () => {
  // State

  const [task, setTask] = useContext(TasksContext);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await axios.get("/tasks/page/1");
      if (data) {
        console.log("Пришёл ответ с сервера");
      }
      setTask({ ...task, tasks: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <NavLink to="/dashboard/users">users</NavLink>
      <CreateTasks />
      <TaskList />
      {/* <pre>{JSON.stringify(task.selected, null, 4)}</pre> */}
      <UpdateTask />
    </div>
  );
};

export default Tasks;
