import { Task } from "../entities/Task";

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  status: 'to do' | 'doing' | 'done';
}

export interface TasksRepository {
  create: (data: TaskData) => Promise<void>;
  list: () => Promise<Task[]>;
  delete: (id: string) => Promise<void>;
  update: (data: TaskData) => Promise<Task>;
  findById: (id: string) => Promise<Task | null>;
}