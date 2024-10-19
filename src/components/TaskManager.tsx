import TaskProvider from "../context/TaskContext"
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

export interface Task{
    id: number,
    text: string,
    completed: boolean
}

const TaskManager = () => {
    return(
        <TaskProvider >
            <div className="main-container">
                <h1>Task Manager</h1>

                <TaskInput />
                <TaskList />
            </div>
        </TaskProvider>
    )
}

export default TaskManager;