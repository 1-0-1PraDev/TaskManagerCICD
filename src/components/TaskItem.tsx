import { useTaskContext } from "../context/TaskContext";
import { Task } from "./TaskManager";

const TaskItem = ({ task }: { task: Task }) => {
  const { toggleTask, deleteTask } = useTaskContext();

  return (
    <>
      <li>
        <span>{task.completed}</span>
        <input
          type="checkbox"
          onChange={() => toggleTask(task.id)}
          checked={task.completed}
        />
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "",
          }}
        >
          {task.text}
        </span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </li>
    </>
  );
};

export default TaskItem;
