import React, { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

type Filter = 'all' | 'active' | 'completed';

const TaskList = () => {
    const { tasks } = useTasks();
    const [filter, setFilter] = useState<Filter>('all');
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        if (filter === 'active') {
            filtered = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filtered = tasks.filter(task => task.completed);
        }

        return [...filtered].sort((a, b) =>
            sortAsc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
        );
    }, [tasks, filter, sortAsc]);

    const getFilterButtonClass = (btn: Filter) =>
        `${
            filter === btn ? 'btn-filter-active' : 'btn-filter-inactive'
        }`;

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <button
                    onClick={() => setFilter('all')}
                    className={getFilterButtonClass('all')}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter('active')}
                    className={getFilterButtonClass('active')}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    className={getFilterButtonClass('completed')}
                >
                    Completed
                </button>
                <button
                    onClick={() => setSortAsc(prev => !prev)}
                >
                    Sort: {sortAsc ? '↑' : '↓'}
                </button>
            </div>
            {filteredTasks.length > 0 ? (
                <div className="task-list flex flex-col gap-4">
                    {filteredTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-zinc-500 italic">No tasks found</div>
            )}
        </div>
    );
};

export default TaskList;
