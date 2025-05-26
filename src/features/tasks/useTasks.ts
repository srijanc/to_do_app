import { useEffect, useMemo, useReducer, useState } from "react";
import { Task } from "./types";
import { TaskService } from "../../services/taskService";
import { v4 as uuidv4 } from "uuid";

interface State {
    tasks: Task[];
}

type Action =
    | { type: "ADD"; title: string }
    | { type: "DELETE"; id: string }
    | { type: "TOGGLE"; id: string }
    | { type: "INIT"; payload: Task[] };

function taskReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD":
            const newTask: Task = {
                id: uuidv4(),
                title: action.title,
                completed: false,
                createdAt: Date.now(),
            };
            return { tasks: [...state.tasks, newTask] };
        case "DELETE":
            return { tasks: state.tasks.filter((t) => t.id !== action.id) };
        case "TOGGLE":
            return {
                tasks: state.tasks.map((t) =>
                t.id === action.id ? { ...t, completed: !t.completed } : t
                ),
            };
        case "INIT":
            return { tasks: action.payload };
        default:
            return state;
    }
}

export function useTasks() {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const loaded = TaskService.getTasks();
        dispatch({ type: "INIT", payload: loaded });
    }, []);

    useEffect(() => {
        TaskService.saveTasks(state.tasks);
    }, [state.tasks]);

    const visibleTasks = useMemo(() => {
        let filtered = state.tasks;

        if (filter === "active")
            filtered = filtered.filter((t) => !t.completed);
        else if (filter === "completed")
            filtered = filtered.filter((t) => t.completed);

        return filtered.sort((a, b) =>
            sortOrder === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
        );
    }, [state.tasks, filter, sortOrder]);

    return {
        tasks: visibleTasks,
        addTask: (title: string) => dispatch({ type: "ADD", title }),
        deleteTask: (id: string) => dispatch({ type: "DELETE", id }),
        toggleTask: (id: string) => dispatch({ type: "TOGGLE", id }),
        filter,
        setFilter,
        sortOrder,
        setSortOrder,
    };
}