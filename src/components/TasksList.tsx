import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import { fetchTasks } from "../app/tasksSlice.ts";
import TaskItem from "./TaskItem.tsx";

const TasksList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
