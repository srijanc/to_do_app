import { Task } from '../types/Task';

export type TaskAction =
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'LOAD_TASKS'; payload: Task[] };

export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case 'ADD_TASK':
            return [action.payload, ...state];
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case 'LOAD_TASKS':
            return action.payload;
        default:
            return state;
    }
};
