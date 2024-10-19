import React, { createContext, useContext, useState } from "react";
import { Task } from "../components/TaskManager";

interface TaskContextProps {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (taskId: number) => void;
  toggleTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (taskId: number) => {
    setTasks((prevTask) => {
      return prevTask.map((task) => {
        return task.id === taskId
          ? { ...task, completed: !task.completed }
          : task;
      });
    });
  };
  console.log(tasks);

  const deleteTask = (taskId: number) => {
    setTasks((prevTask) => {
      return prevTask.filter((task) => task.id !== taskId);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be within the task provider");
  }

  return context;
};
