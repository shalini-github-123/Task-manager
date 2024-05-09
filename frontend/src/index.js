import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TasksContext"; // Update to TasksContextProvider
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        {" "}
        {/* Update to use TasksContextProvider */}
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
