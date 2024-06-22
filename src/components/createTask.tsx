import { Dispatch, useRef } from "react";
import { ProjectsAction, Task } from "../types";

export default function CreateTask({ projectsDispatch, projectId }: { projectsDispatch: Dispatch<ProjectsAction>, projectId: number }) {
    const taskInput = useRef<HTMLInputElement>(null)

    const createTask = () => {
        if(!taskInput.current) return
        if(taskInput.current.value.trim().length === 0) return

        const newTask: Task = {
            text: taskInput.current.value,
            completed: false
        }
        taskInput.current.value = ""

        projectsDispatch({ type: "CREATE_TASK", projectIndex: projectId, data: newTask })
    }

    return(
        <li><input type="text" ref={taskInput} placeholder="New task..." onKeyDown={(e) => { if(e.key === "Enter") {createTask()}}}/><button onClick={() => createTask()}>Create</button></li>
    )
}