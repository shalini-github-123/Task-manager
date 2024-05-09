import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios"; // Import axios
import { useTasksContext } from "../hooks/useTasksContext";

const UpdateTaskForm = ({ todoTask, onClose }) => {
  const [task, setTask] = useState(todoTask.task);
  const [priority, setPriority] = useState(todoTask.priority);
  const [deadline, setDeadline] = useState(todoTask.deadline);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useTasksContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `/api/tasks/${todoTask._id}`,
        {
          task,
          priority,
          deadline,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the task details in the UI
        // You can dispatch an action to update the task in the context
        // Or update the task directly if it's stored in component state
        dispatch({ type: 'UPDATE_TASK', payload: response.data });
        onClose(); // Close the update form
      } else {
        // Handle error response
        setError("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <h3>Update Task</h3>
      <label>Task:</label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <label>Priority:</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Update</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateTaskForm;
