export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
}

export type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'LOAD_TASKS'; payload: Task[] };