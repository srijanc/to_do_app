import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Task = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
};

type Filter = 'all' | 'active' | 'completed';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('all');
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    const addTask = () => {
        const trimmedText = newTaskText.trim();
        if (trimmedText) {
            const newTask: Task = {
                id: uuidv4(),
                text: trimmedText,
                completed: false,
                createdAt: Date.now(),
            };
            setTasks(prev => [newTask, ...prev]);
            setNewTaskText('');
        }
    };

    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const filteredTasks = tasks
        .filter(task => {
            if (filter === 'active')
                return !task.completed;
            if (filter === 'completed')
                return task.completed;
            return true;
        })
        .sort((a, b) =>
            sortAsc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
        );

    return (
        <div className="max-w-2xl w-full mx-auto mt-10 p-6 rounded-lg bg-zinc-900 shadow-lg">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
                To-Do List
            </h1>

            {/* Input Section */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-grow"
                    placeholder="Add a new task"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                />
                <button onClick={addTask}>Add</button>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {(['all', 'active', 'completed'] as Filter[]).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={filter === f ? 'active' : ''}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
                <button onClick={() => setSortAsc((prev) => !prev)}>
                    Sort: {sortAsc ? '↑' : '↓'}
                </button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                                    {task.text}
                                </span>
                            </div>
                            <button className="delete" onClick={() => deleteTask(task.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-zinc-500 italic">No tasks found</div>
                )}
            </div>
        </div>
    );
};

export default App;