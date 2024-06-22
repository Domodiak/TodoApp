import { css, styled } from "styled-components"
import { Project, ProjectsAction } from "../types"
import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState } from "react"
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

const ModalCss = css`
    padding: 2rem;
    border-radius: 0.5rem;
    border: 1px #889ae3 solid;
    gap: 1rem;

    &[open] {
        display: flex;
        flex-direction: column;
    }
`

const CloseButton = styled.button`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    aspect-ratio: 1;
    background-color: transparent;
`

const ModalInput = styled.input`
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 0.3rem;
    font-size: 1rem;
`

const ModalGroup = styled.div`
    margin: 0.5rem 0 0.5rem 0;
`

const ModalTextarea = styled.textarea`
    font-size: 1rem;
    border: 1px solid gray;
    padding: 1rem;
    border-radius: 0.3rem;
    resize: vertical;
    max-height: 60dvh;
`

const ModalButton = styled.button`
    padding: 1rem;
    border: 1px solid gray;
    background-color: transparent;
    border-radius: 0.3rem;
`

const Error = styled.div`
    color: red;
    margin-bottom: 0.5rem;
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

        if(errors) return;

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

        nameInput.current.value = "";
        descriptionInput.current.value = "";
        deadlineInput.current.value = "";

        setNameError("")
        setDeadlineError("")

        closeDialog()
        setSelectedProjectId(projects.length)
    }

    const listItem = (project: Project, index: number) =>
        <SidebarItem selected={selectedProjectId == index} onClick={() => setSelectedProjectId(index)} key={index}>{project.name}</SidebarItem>

    return (
        <>
            <Modal ref={dialog} css={ModalCss} targetElement={document.getElementsByTagName("body")[0]}>
                <CloseButton onClick={closeDialog}><span className="material-symbols-outlined">close</span></CloseButton>
                <ModalGroup>
                    {nameError ? <Error>{nameError}</Error> : null}
                    <ModalInput type="text" ref={nameInput} placeholder="Project name" />
                </ModalGroup>
                <ModalGroup>
                    <ModalTextarea ref={descriptionInput} placeholder="Project description" />
                </ModalGroup>
                <ModalGroup>
                    {deadlineError ? <Error>{deadlineError}</Error> : null}
                    <ModalInput type="date" ref={deadlineInput} placeholder="Project deadline" />
                </ModalGroup>
                <ModalGroup>
                    <ModalButton onClick={createProject}>Create</ModalButton>
                </ModalGroup>
            </Modal>
            <SidebarContainer>
                {projects.map(listItem)}

                <SidebarItem selected={false} onClick={openDialog}>+ Create project</SidebarItem>
            </SidebarContainer>
        </>
    )
}
