import { css, styled } from "styled-components"
import { Project, ProjectsAction } from "../types"
import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState } from "react"
import ProjectModal from "./projectModal"

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
    const [ nameError, setNameError ] = useState<string>()
    const [ deadlineError, setDeadlineError ] = useState<string>()

    const openDialog = () => {
        dialog.current && dialog.current.showModal()
    }
    const closeDialog = () => {
        dialog.current && dialog.current.close()
    }
    const createProject: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        let errors = false;
        if (!nameInput.current || nameInput.current.value.trim().length === 0) {
            errors = true;
            setNameError("Name cannot be empty")
        }

        if(!deadlineInput.current || !Date.parse(deadlineInput.current.value)) {
            errors = true;
            setDeadlineError("Date is invalid")
        }

        if(!descriptionInput.current) {
            errors = true;
        }

        if(errors) return;

        const projectName = nameInput.current!.value
        const projectDescription = descriptionInput.current!.value
        const projectDeadline = Date.parse(deadlineInput.current!.value)

        dispatchProjects({
            type: "CREATE_PROJECT",
            data: {
                name: projectName,
                description: projectDescription,
                deadline: projectDeadline,
                tasks: []
            }
        })

        nameInput.current!.value = "";
        descriptionInput.current!.value = "";
        deadlineInput.current!.value = "";

        setNameError("")
        setDeadlineError("")

        closeDialog()
        setSelectedProjectId(projects.length)
    }

    const listItem = (project: Project, index: number) =>
        <SidebarItem selected={selectedProjectId == index} onClick={() => setSelectedProjectId(index)} key={index}>{project.name}</SidebarItem>

    return (
        <>
            <ProjectModal buttonLabel="Create" dialog={dialog} closeDialog={closeDialog} nameError={nameError} nameInput={nameInput} descriptionInput={descriptionInput} deadlineError={deadlineError} deadlineInput={deadlineInput} callback={createProject} />
            <SidebarContainer>
                {projects.map(listItem)}

                <SidebarItem selected={false} onClick={openDialog}>+ Create project</SidebarItem>
            </SidebarContainer>
        </>
    )
}
