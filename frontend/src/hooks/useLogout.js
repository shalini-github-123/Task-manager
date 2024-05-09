import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext"; // Import useTasksContext instead of useWorkoutsContext

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchTasks } = useTasksContext(); // Destructure dispatch from useTasksContext

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // Set tasks to null upon logout
    dispatchTasks({ type: "SET_TASKS", payload: null }); // Change action type to SET_TASKS
  };

  return { logout };
};
