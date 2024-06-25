import { Dispatch, useRef } from "react";
import { ProjectsAction, Task } from "../types";
import styled from "styled-components";

const TaskContainer = styled.li`
    border-radius: 0.3rem;
    overflow: hidden;
    border: 1px solid gray;
    position: relative;
`
const TaskInput = styled.input`
    font-size: 1rem;
    padding: 1rem;
    width: 80%;
    display: inline-block;
    box-sizing: border-box;
`

const TaskButton = styled.button`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20%;
    padding: 1rem;

    transition: 0.3s;

    &:hover {
        background-color: #52a5ff;
    }
`

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
        <TaskContainer><TaskInput type="text" ref={taskInput} placeholder="New task..." onKeyDown={(e) => { if(e.key === "Enter") {createTask()}}}/><TaskButton onClick={() => createTask()}>Create</TaskButton></TaskContainer>
    )
}