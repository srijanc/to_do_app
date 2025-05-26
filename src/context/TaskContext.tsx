import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { taskReducer } from '../reducers/taskReducer';
import { Task } from '../types/Task';

type TaskContextType = {
    tasks: Task[];
    dispatch: React.Dispatch<any>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, dispatch] = useReducer(taskReducer, [], () => {
        const local = localStorage.getItem('tasks');
        return local ? JSON.parse(local) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
};
