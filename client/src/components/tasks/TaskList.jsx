import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { TasksContext } from "../../context/tasks";
import { Button } from "evergreen-ui";
import { AuthContext } from "../../context/auth";

const TaskList = () => {
  const dayjs = require("dayjs");
  var isoWeek = require("dayjs/plugin/isoWeek");
  const relativeTime = require("dayjs/plugin/relativeTime");
  const customParseFormat = require("dayjs/plugin/customParseFormat");
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  require("dayjs/locale/ru");
  dayjs.extend(relativeTime);
  dayjs.extend(customParseFormat);
  dayjs.updateLocale("en", {
    weekdays: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  });
  // Context
  const [task, setTask] = useContext(TasksContext);
  const [auth, setAuth] = useContext(AuthContext);
  // State
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Effect
  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadTasks();
  }, [page]);

  // Other functions
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/tasks/count");
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks/page/${page}`);
      setTask((prev) => ({ ...prev, tasks: [...prev.tasks, ...data] }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClick = (item) => {
    setTask({ ...task, selected: item });
  };

  // function ControlledCheckboxExample() {
  //   const [checked, setChecked] = useState(true);
  //   return (
  //     <Checkbox
  //       label="Controlled usage"
  //       checked={checked}
  //       onChange={(e) => setChecked(e.target.checked)}
  //     />
  //   );
  // }
  return (
    <div className="mt-2">
      <div className="main-container">
        <div className="tasks-label">
          <b>
            {task?.tasks?.length}
            <span> tasks</span>
          </b>
          <div className="line"></div>
        </div>
        <div className="task-all-container">
          {task?.tasks.map((task, index) => (
            <div className="task" key={task._id}>
              <div className="task-createdAt">
                <span>{dayjs(task.createdAt).format("MMM DD YYYY, ddd")}</span>
                <div className="task-time">
                  {dayjs(task.createdAt).format("HH:mm:ss     ")}
                </div>
              </div>

              <div
                className="task-body"
                style={{
                  background:
                    auth?.user?._id === task?.postedBy?._id
                      ? "#34373c"
                      : "#34373c",
                }}
                onClick={() => handleClick(task)}
              >
                <div className="task-labels">
                  <div className="task-id">#{index + 1}</div>
                  <div className="task-category">Category</div>
                </div>
                <div className="task-name">
                  <p>{task.task}</p>
                </div>
                {/* <div className="task-time align-self-end">
                  <span>
                    {dayjs(task.createdAt).locale("ru").fromNow()} by
                    <b>{task?.postedBy?.name}</b>
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        {task?.tasks?.length < total && (
          <div
            className="load-more-button"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            Load more
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
