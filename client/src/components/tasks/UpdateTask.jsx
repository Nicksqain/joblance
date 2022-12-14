import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Pane,
  Textarea,
  TrashIcon,
} from "evergreen-ui";
import { TasksContext } from "../../context/tasks";
import { AuthContext } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const UpdateTask = () => {
  // Context
  const [task, setTask] = useContext(TasksContext);
  const [auth, setAuth] = useContext(AuthContext);

  // Hooks
  // const [canUpdateTask, setCanUpdateTask] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {}, []);
  useEffect(() => {
    if (task) setContent(task?.selected?.task);
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/tasks/${task?.selected?._id}`, {
        task: content,
      });
      const newTasksList = task.tasks.map((t) => {
        if (t._id === data?._id) {
          return data;
        }
        return t;
      });
      setTask((prev) => ({ ...prev, tasks: newTasksList, selected: null }));
      toast.success("Task updated");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/tasks/${task?.selected?._id}`);
      setTask((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t._id !== data._id),
        selected: null,
      }));
      toast.error("Task removed");
    } catch (error) {
      console.log(error);
    }
  };
  const canUpdateTask =
    auth?.user?._id === task?.selected?.postedBy._id ||
    auth?.user?.role === "Admin";
  return (
    <div>
      <Dialog
        isShown={task?.selected !== null}
        title="Task"
        hasFooter={true}
        confirmLabel="This is a sample dialog for demo"
        onCloseComplete={() => setTask({ ...task, selected: null })}
      >
        <Pane clearfix className="d-flex justify-content w-100">
          <Textarea
            height={20}
            marginRight={25}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></Textarea>
          {canUpdateTask ? (
            <Pane display="flex" alignItems="center">
              <Button onClick={handleUpdate} marginRight={16}>
                Update
              </Button>
              <IconButton
                onClick={handleRemove}
                icon={TrashIcon}
                intent="danger"
              />
            </Pane>
          ) : (
            <Pane display="flex" alignItems="center">
              <Button
                marginRight={16}
                disabled={auth.user.role === "Admin" ? false : true}
              >
                Posted by: {task?.selected?.postedBy?.name}
              </Button>
            </Pane>
          )}
        </Pane>
      </Dialog>
    </div>
  );
};

export default UpdateTask;
