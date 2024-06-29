import { Dispatch, useEffect, useRef, useState } from "react"
import { ProjectsAction, Task as T_Task } from "../types"
import styled from "styled-components"

interface TaskTextProps {
    completed: string
}

const TaskContainer = styled.li`
    margin: 0.5rem 0;
    position: relative;

    &:hover {
        background: #eee;
    }
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

const Actions = styled.div`
    width: 20%;
    height: 100%;
`

export default function Task({ task, projectsDispatch, projectIndex, taskIndex }: { task: T_Task, projectsDispatch: Dispatch<ProjectsAction>, projectIndex: number, taskIndex: number }) {
    const [ isHovered, setIsHovered ] = useState(false)
    const [ isEditing, setIsEditing ] = useState(false)
    const editInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(editInput.current) editInput.current.value = task.text
    }, [isEditing])

    const toggle = () => {
        const newTask: T_Task = JSON.parse(JSON.stringify(task))
        newTask.completed = !newTask.completed
        projectsDispatch({ type: "UPDATE_TASK", projectIndex: projectIndex, taskIndex: taskIndex, data: newTask })
    }

    const onMouseEnter = () => {
        setIsHovered(true)
    }
    const onMouseLeave = () => {
        setIsHovered(false)
    }
    const deleteTask= () => {
        projectsDispatch({
            type: "DELETE_TASK",
            projectIndex: projectIndex,
            taskIndex: taskIndex,
        })
    }

    const startEditing = () => {
        setIsEditing(true)
    }
    const saveChanges = () => {
        if(!isEditing) return
        const newTask: T_Task = JSON.parse(JSON.stringify(task))
        newTask.text = editInput.current!.value
        projectsDispatch({
            type: "UPDATE_TASK",
            projectIndex: projectIndex,
            taskIndex: taskIndex,
            data: newTask
        })

        setIsEditing(false)
    }
    const cancelChanges = () => {
        setIsEditing(false)
    }

    return (
        <TaskContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div>
                <input type="checkbox" checked={task.completed} onChange={ toggle } />
                { 
                isEditing ? <input autoFocus onKeyDown={(e) => { if(e.key === "Enter") { saveChanges() } }} ref={editInput} />
                : <TaskText completed={ task.completed.toString() }>{ task.text }</TaskText>
                }
            </div>
            { isHovered && 
            <Actions>
                { 
                isEditing ? <><button onClick={saveChanges}>Save</button><button onClick={cancelChanges}>Cancel</button></>// TODO: Replace with an icon
                : <><button onClick={startEditing}>Edit</button><button onClick={deleteTask}>Delete</button></>
                }
            </Actions> }
        </TaskContainer>
    )
}
