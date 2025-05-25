import { Task } from "../types";

export function TaskItem({ task, onToggle, onDelete }: {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="flex justify-between items-center bg-white p-2 rounded shadow">
            <label className="flex items-center">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <span className={`ml-2 ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</span>
            </label>
            <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
        </div>
    );
}