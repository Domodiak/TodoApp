import { Dispatch } from "react"
import { ProjectsAction, Task as T_Task } from "../types"
import styled from "styled-components"

interface TaskTextProps {
    completed: string
}

const TaskContainer = styled.li`
    margin: 0.5rem 0;
`
const TaskText = styled.span<TaskTextProps>`
    margin-left: 1rem;
    font-size: 1rem;

    ${ props => props.completed === "true" && `
        text-decoration: line-through;
        color: #777;
    `}
`

export default function Task({ task, projectsDispatch, projectIndex, taskIndex }: { task: T_Task, projectsDispatch: Dispatch<ProjectsAction>, projectIndex: number, taskIndex: number }) {
    const toggle = () => {
        const newTask: T_Task = JSON.parse(JSON.stringify(task))
        newTask.completed = !newTask.completed
        projectsDispatch({ type: "UPDATE_TASK", projectIndex: projectIndex, taskIndex: taskIndex, data: newTask })
    }

    return (
        <TaskContainer><input type="checkbox" checked={task.completed} onChange={ toggle } /><TaskText completed={ task.completed.toString() }>{ task.text }</TaskText></TaskContainer>
    )
}
