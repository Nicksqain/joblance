import { useState, createContext } from "react";
import "../components/tasks/tasks.scss";
const TasksContext = createContext();
const TasksProvider = ({ children }) => {
  const [task, setTask] = useState({
    tasks: [],
    selected: null,
  });

  return (
    <TasksContext.Provider value={[task, setTask]}>
      {children}
    </TasksContext.Provider>
  );
};
export { TasksContext, TasksProvider };
