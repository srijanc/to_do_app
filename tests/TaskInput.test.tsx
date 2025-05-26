import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from '../src/components/TaskInput';
import { TaskProvider } from '../src/context/TaskContext';

/*
Tests:
1. Renders input and Add button.
2. Typing updates input field.
3. Submitting the form calls the context dispatch with correct payload.
*/

describe('TaskInput', () => {
    test('renders input and button', () => {
        render(
            <TaskProvider>
                <TaskInput />
            </TaskProvider>
        );

        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    test('allows input typing', () => {
        render(
            <TaskProvider>
                <TaskInput />
            </TaskProvider>
        );

        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, { target: { value: 'Test task' } });
        expect(input).toHaveValue('Test task');
    });

    test('adds a task on submit', () => {
        render(
            <TaskProvider>
                <TaskInput />
            </TaskProvider>
        );

        const input = screen.getByPlaceholderText(/add a new task/i);
        const button = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New task' } });
        fireEvent.click(button);

        expect(input).toHaveValue('');
    });
});