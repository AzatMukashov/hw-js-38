export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskResponse {
  [id: string]: {
    title: string;
    completed: boolean;
  };
}