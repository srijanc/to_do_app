import { Task } from '../types/Task';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }: { task: Task }) => {
    const { dispatch } = useTasks();

    return (
        <div className="task-item">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                    className="w-5 h-5"
                />
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                </span>
            </div>
            <button
                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                className="delete"
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;