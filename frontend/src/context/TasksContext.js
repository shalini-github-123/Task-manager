import { createContext, useReducer } from "react";

export const TasksContext = createContext(); // Change context name to TasksContext

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task._id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

export const TasksContextProvider = ({ children }) => {
  // Change context name to TasksContextProvider
  const [state, dispatch] = useReducer(tasksReducer, {
    // Change reducer name to tasksReducer
    tasks: null, // Change state property name to tasks
  });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {" "}
      {/* Change context name to TasksContext */}
      {children}
    </TasksContext.Provider>
  );
};
