import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <TaskProvider>
            <div className="max-w-2xl w-full mx-auto mt-10 p-6 rounded-lg bg-zinc-900 shadow-lg">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
                    To-Do List
                </h1>
                    <TaskInput />
                    <TaskList />
            </div>
        </TaskProvider>
    );
};

export default App;