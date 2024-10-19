import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskInput = () => {
  const [newTaskText, setTaskText] = useState("");
  const { addTask } = useTaskContext();

  const handleAddTask = () => {
    if (newTaskText.trim() === "") {
      return; // Do not add empty tasks
    }
    addTask(newTaskText);
    setTaskText("");
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTaskText(e.target.value)}
        value={newTaskText}
        placeholder="Enter a new task"
        name=""
        id=""
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
