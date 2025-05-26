import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../src/components/TaskList';
import { TaskProvider } from '../src/context/TaskContext';

/*
Tests:
1. Filters work (All, Active, Completed).
2. Sort button toggles sorting.
*/

describe('TaskList', () => {
    test('renders filter and sort buttons', () => {
        render(
            <TaskProvider>
                <TaskList />
            </TaskProvider>
        );

        expect(screen.getByText(/all/i)).toBeInTheDocument();
        expect(screen.getByText(/active/i)).toBeInTheDocument();
        expect(screen.getByText(/completed/i)).toBeInTheDocument();
        expect(screen.getByText(/sort/i)).toBeInTheDocument();
    });

    test('filter buttons toggle active state', () => {
        render(
            <TaskProvider>
                <TaskList />
            </TaskProvider>
        );

        const activeBtn = screen.getByText(/active/i);
        fireEvent.click(activeBtn);
        expect(activeBtn).toHaveClass('btn-filter-active');
    });
});