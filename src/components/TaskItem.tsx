import React from "react";
import { Task } from "../types";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus } from "../app/tasksSlice.ts";
import { AppDispatch } from "../app/store.ts";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleCheckboxChange = () => {
    dispatch(updateTaskStatus({ ...task, completed: !task.completed }));
  };
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      {task.title}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
