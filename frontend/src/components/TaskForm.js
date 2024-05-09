import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (!task || !priority || !deadline) {
      setEmptyFields(["task", "priority", "deadline"]);
      setError("Please fill in all the fields");
      return;
    }

    const todoTask = { task, priority, deadline };

    try {
      const response = await axios.post("/api/tasks", todoTask, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setTask("");
        setPriority("");
        setDeadline("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_TASK", payload: response.data});
      } else {
        // Handle unexpected response status
        setError("Failed to create task. Please try again later.");
      }
    } catch (error) {
      // Handle network errors or server-side errors
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again later.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task:</label>
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        className={emptyFields && emptyFields.includes("task") ? "error" : ""}
      />

      <label>Priority:</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={
          emptyFields && emptyFields.includes("priority") ? "error" : ""
        }
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label>Deadline:</label>
      <input
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        className={
          emptyFields && emptyFields.includes("deadline") ? "error" : ""
        }
      />

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
