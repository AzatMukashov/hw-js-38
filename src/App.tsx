import "./App.css";
import React from "react";
import AddTaskForm from "./components/AddTaskForm.tsx";
import TasksList from "./components/TasksList.tsx";

const App: React.FC = () => (
  <div>
    <h1>TODO List</h1>
    <AddTaskForm />
    <TasksList />
  </div>
);

export default App;
