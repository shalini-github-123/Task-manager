import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UpdateTaskForm from "./UpdateTaskForm";
import format from "date-fns/format";
import axios from "axios"; // Import axios

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.delete(`/api/tasks/${task._id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        dispatch({ type: "DELETE_TASK", payload: task._id });
      } else {
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleComplete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.patch(
        `/api/tasks/${task._id}/toggle`,
        null,
        {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedTask = response.data;
        dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      } else {
        // Handle other status codes if needed
      }
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <div
      className={`task-details ${
        task.status === "completed" ? "completed" : ""
      }`}
    >
      {isUpdating ? (
        <UpdateTaskForm todoTask={task} onClose={() => setIsUpdating(false)} />
      ) : (
        <>
          <h4>{task.task}</h4>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {format(new Date(task.deadline), "MM/dd/yyyy")}
          </p>
          <p>
            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </p>
          <div className="buttons">
            <span className="material-symbols-outlined" onClick={handleDelete}>
              delete
            </span>
            <span className="material-symbols-outlined" onClick={handleUpdate}>
              update
            </span>
            <button
              className={`complete-button ${
                task.status === "completed" ? "completed" : ""
              }`}
              onClick={handleComplete}
            >
              {task.status === "completed" ? "Completed" : "Incomplete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskDetails;
