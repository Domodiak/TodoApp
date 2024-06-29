import { Dispatch, MouseEventHandler, useState } from "react"
import { ProjectsAction, Task as T_Task } from "../types"
import styled from "styled-components"

interface TaskTextProps {
    completed: string
}
interface DeleteProps {
    show: boolean
}

const TaskContainer = styled.li`
    margin: 0.5rem 0;
    position: relative;

    &:hover {
        background: #eee;
    }
`
const TaskText = styled.span<TaskTextProps>`
    margin-left: 1rem;
    font-size: 1rem;
    word-wrap: break-word;

    ${ props => props.completed === "true" && `
        text-decoration: line-through;
        color: #777;
    `}
`

const Delete = styled.button<DeleteProps>`
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 10%;

    ${ props => props.show && `
        display: flex;
    `}
`

export default function Task({ task, projectsDispatch, projectIndex, taskIndex }: { task: T_Task, projectsDispatch: Dispatch<ProjectsAction>, projectIndex: number, taskIndex: number }) {
    const [ isHovered, setIsHovered ] = useState(false)

    const toggle = () => {
        const newTask: T_Task = JSON.parse(JSON.stringify(task))
        newTask.completed = !newTask.completed
        projectsDispatch({ type: "UPDATE_TASK", projectIndex: projectIndex, taskIndex: taskIndex, data: newTask })
    }

    const onMouseEnter: MouseEventHandler<HTMLLIElement> = () => {
        setIsHovered(true)
    }
    const onMouseLeave: MouseEventHandler<HTMLLIElement> = () => {
        setIsHovered(false)
    }
    const deleteTask: MouseEventHandler<HTMLButtonElement> = () => {
        projectsDispatch({
            type: "DELETE_TASK",
            projectIndex: projectIndex,
            taskIndex: taskIndex,
        })
    }

    return (
        <TaskContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}><input type="checkbox" checked={task.completed} onChange={ toggle } /><TaskText completed={ task.completed.toString() }>{ task.text }</TaskText><Delete show={isHovered} onClick={deleteTask}>Delete</Delete></TaskContainer> //TODO: Replace with an icon
    )
}
