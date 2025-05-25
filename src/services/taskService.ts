import { Task } from "../features/tasks/types";

const STORAGE_KEY = "todo_tasks";

export const TaskService = {
    getTasks(): Task[] {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },
    saveTasks(tasks: Task[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },
};
