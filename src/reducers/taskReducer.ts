import { Task, TaskAction } from '../types/Task';

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
