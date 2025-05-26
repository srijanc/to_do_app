import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../src/components/TaskItem";

test("renders a task", () => {
    const task = { id: "1", title: "Test Task", completed: false, createdAt: Date.now() };
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
});
