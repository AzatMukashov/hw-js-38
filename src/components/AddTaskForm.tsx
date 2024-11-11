import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../app/tasksSlice.ts";
import { AppDispatch } from "../app/store.ts";

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
