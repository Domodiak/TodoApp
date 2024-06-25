import styled from "styled-components";
import { Project, ProjectsAction } from "../types";
import Task from "./task";
import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState } from "react";
import CreateTask from "./createTask";
import ProjectModal from "./projectModal";

const ProjectContainer = styled.main`
    padding: 1rem;
    width: 80%;
`

const ProjectTitle = styled.h1`
    font-size: 3rem;
    line-height: 1;
    margin-bottom: 0.5rem;
`

const ProjectDeadline = styled.p`
    color: #555;
    margin-bottom: 1rem;
`

const ProjectDescription = styled.p`
    max-height: 30dvh;
    overflow-y: scroll;
    word-wrap: break-word;
`

const Tasks = styled.ul`
    list-style-type: none;
    padding: 2rem;
    border: 1px solid gray;
    border-radius: 0.5rem;
    margin: 1rem 0;
`

export default function ProjectView({ setSelectedProjectId, projectsDispatch, project, projectId }: { projectsDispatch: Dispatch<ProjectsAction>, setSelectedProjectId: Dispatch<SetStateAction<number | undefined>>, project: Project | null, projectId: number | undefined }) {
    if (!project) {
        return (
            <ProjectContainer>
                No project selected
            </ProjectContainer>
        )
    }

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

    const deleteProject: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        projectsDispatch({type: "DELETE_PROJECT", projectIndex: projectId!})
        setSelectedProjectId(undefined)
    }

    const editProject: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        let errors = false
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

        projectsDispatch({
            type: "UPDATE_PROJECT",
            data: {
                name: projectName,
                description: projectDescription,
                deadline: projectDeadline,
                tasks: []
            },
            projectIndex: projectId!
        })

        nameInput.current!.value = "";
        descriptionInput.current!.value = "";
        deadlineInput.current!.value = "";

        setNameError("")
        setDeadlineError("")

        closeDialog()
    }

    return (
        <>
            <ProjectModal buttonLabel="Update" initial={project} dialog={dialog} closeDialog={closeDialog} nameError={nameError} nameInput={nameInput} descriptionInput={descriptionInput} deadlineError={deadlineError} deadlineInput={deadlineInput} callback={editProject} />
            <ProjectContainer>
                <ProjectTitle>{project.name}</ProjectTitle>
                <ProjectDeadline>{new Date(project.deadline).toDateString()}</ProjectDeadline>
                <ProjectDescription>{project.description}</ProjectDescription>
                <Tasks>
                    { project.tasks.map((task, index) => <Task task={task} key={index} projectIndex={projectId!} taskIndex={index} projectsDispatch={projectsDispatch} />) }
                    <CreateTask projectsDispatch={projectsDispatch} projectId={projectId!} />
                </Tasks>
                <button onClick={openDialog}>Edit</button>
                <button onClick={deleteProject}>Delete</button>
                </ProjectContainer>
        
        </>
    )
} 
