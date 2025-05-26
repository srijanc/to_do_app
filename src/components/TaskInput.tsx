import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = () => {
    const [text, setText] = useState('');
    const { dispatch } = useTasks();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) return;

        dispatch({
            type: 'ADD_TASK',
            payload: {
                id: uuidv4(),
                title: text.trim(),
                completed: false,
                createdAt: Date.now(),
            },
        });

        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                className="flex-grow"
                placeholder="Add a new task"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button type="submit">
                Add
            </button>
        </form>
    );
};

export default TaskInput;
