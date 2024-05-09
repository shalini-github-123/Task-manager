import { TasksContext } from "../context/TasksContext"; // Import TasksContext instead of WorkoutsContext
import { useContext } from "react";

export const useTasksContext = () => {
  // Rename the hook to useTasksContext
  const context = useContext(TasksContext); // Use TasksContext instead of WorkoutsContext

  if (!context) {
    throw Error("useTasksContext must be used inside a TasksContextProvider"); // Update error message
  }

  return context;
};
