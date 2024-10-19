import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskManager from "./components/TaskManager";
import "@testing-library/jest-dom";

describe("TaskManager", () => {
  test("renders TaskManager component", () => {
    render(<TaskManager />);
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  test("can add a new task", () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText(
      "Enter a new task"
    ) as HTMLInputElement;
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  test("can toggle task completion", () => {
    render(<TaskManager />);

    // Step 1: Add a new task
    const input = screen.getByPlaceholderText("Enter a new task");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Toggle task" } });
    fireEvent.click(addButton);

    // Step 2: Get the checkbox and the task item
    const taskItem = screen.getByText("Toggle task");
    const checkbox = screen.getByRole("checkbox");

    // Step 3: Assert that the checkbox is initially unchecked and task has no strikethrough
    expect(checkbox).not.toBeChecked();
    expect(taskItem).not.toHaveStyle("text-decoration: line-through");

    // Step 4: Click the checkbox to toggle the task completion
    fireEvent.click(checkbox);

    // Step 5: Assert that the checkbox is checked and the task has strikethrough
    expect(checkbox).toBeChecked();
    expect(taskItem).toHaveStyle("text-decoration: line-through");
  });

  test("does not add empty tasks", () => {
    render(<TaskManager />);
    const addButton = screen.getByText("Add Task");

    // Try clicking the "Add Task" button without entering any text
    fireEvent.click(addButton);

    // Expect no tasks to be added
    const tasks = screen.queryAllByRole("listitem");
    expect(tasks).toHaveLength(0);
  });
});
