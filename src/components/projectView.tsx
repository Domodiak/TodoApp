import styled from "styled-components";
import { Project, ProjectsAction } from "../types";
import Task from "./task";
import { Dispatch } from "react";
import CreateTask from "./createTask";

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

export default function ProjectView({ projectsDispatch, project, projectId }: { projectsDispatch: Dispatch<ProjectsAction>, project: Project | null, projectId: number | undefined }) {
    if (!project) {
        return (
            <ProjectContainer>
                No project selected
            </ProjectContainer>
        )
    }
    return (
        <ProjectContainer>
            <ProjectTitle>{project.name}</ProjectTitle>
            <ProjectDeadline>{new Date(project.deadline).toDateString()}</ProjectDeadline>
            <ProjectDescription>{project.description}</ProjectDescription>
            <Tasks>
                { project.tasks.map((task, index) => <Task task={task} key={index} projectIndex={projectId!} taskIndex={index} projectsDispatch={projectsDispatch} />) }
                <CreateTask projectsDispatch={projectsDispatch} projectId={projectId!} />
            </Tasks>
        </ProjectContainer>
    )
} 
