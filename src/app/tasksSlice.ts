import { Task, TaskResponse } from '../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosAPI from '../axiosAPI.ts';
import { AxiosResponse } from 'axios';

interface TasksState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
}

export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const response: AxiosResponse<TaskResponse | null> = await axiosAPI.get('/tasks.json');
  const taskList: TaskResponse | null = response.data;
  if (!taskList) {
    return [];
  }
  return Object.entries(taskList).map(([id, task]) => ({id, ...task}));
});

export const addTask = createAsyncThunk<Task, string>('tasks/addTask', async (title) => {
  const response: AxiosResponse<{name: string}> = await axiosAPI.post('/tasks.json', {title, completed: false});
  return {id: response.data.name, title, completed: false};
});

export const deleteTask = createAsyncThunk<string, string>('tasks/deleteTask', async (id) => {
  await axiosAPI.delete(`/tasks/${id}.json`);
  return id;
});

export const updateTaskStatus = createAsyncThunk<Task, Task>('task/updateTaskStatus', async (task) => {
  const response: AxiosResponse<Task> = await axiosAPI.put(`/tasks/${task.id}.json`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default tasksSlice.reducer;