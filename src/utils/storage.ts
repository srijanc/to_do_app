import { Task } from '../types/Task';

const STORAGE_KEY = 'to_do_tasks';

export const loadTasks = (): Task[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        console.warn('Invalid task data in localStorage.');
        return [];
    }
};

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};