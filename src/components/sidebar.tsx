import { css, styled } from "styled-components"
import { Project, ProjectsAction } from "../types"
import { Dispatch, MouseEventHandler, SetStateAction, useRef } from "react"
import Modal from "./modal"

const SidebarContainer = styled.aside`
    background-color: gray;
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    box-sizing: border-box;
`

type ItemProps = {
    selected: boolean
}

const SidebarItem = styled.button<ItemProps>`
    padding: 0.3rem;
    border-radius: 0.2rem;

    ${(p) => p.selected && css`
        background-color: #aaa;    
    `}
`

export default function Sidebar({ projects, dispatchProjects, selectedProjectId, setSelectedProjectId }: { projects: Project[], dispatchProjects: Dispatch<ProjectsAction>, selectedProjectId: number | undefined, setSelectedProjectId: Dispatch<SetStateAction<number | undefined>> }) {

    const dialog = useRef<HTMLDialogElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const descriptionInput = useRef<HTMLTextAreaElement>(null)
    const deadlineInput = useRef<HTMLInputElement>(null)

    const openDialog = () => {
        dialog.current && dialog.current.showModal()
    }
    const closeDialog = () => {
        dialog.current && dialog.current.close()
    }
    const createProject: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        if(!nameInput.current || !descriptionInput.current || !deadlineInput.current) return // TODO: Show fields with errors

        const projectName = nameInput.current.value
        const projectDescription = descriptionInput.current.value
        const projectDeadline = new Date(deadlineInput.current.value)

        dispatchProjects({
            type: "CREATE_PROJECT",
            data: {
                name: projectName,
                description: projectDescription,
                deadline: projectDeadline,
                tasks: []
            }
        })

        closeDialog()

        setSelectedProjectId(projects.length)
    }

    const listItem = (project: Project, index: number) =>
        <SidebarItem selected={selectedProjectId == index} onClick={() => setSelectedProjectId(index)} key={index}>{project.name}</SidebarItem>

    return (
        <>
            <Modal ref={dialog} targetElement={document.getElementsByTagName("body")[0]}>
                <button onClick={closeDialog}>X</button>
                <input type="text" ref={nameInput} placeholder="Project name" />
                <textarea ref={descriptionInput} placeholder="Project description" />
                <input type="date" ref={deadlineInput} placeholder="Project deadline" />
                
                <button onClick={createProject}>Create</button>
            </Modal>
            <SidebarContainer>
                { projects.map(listItem) }

                <SidebarItem selected={false} onClick={openDialog}>+ Create project</SidebarItem>
            </SidebarContainer>
        </>
    )
}