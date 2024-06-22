import styled from "styled-components";
import { Project } from "../types";

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

export default function ProjectView({ project }: { project: Project | null }) {
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
        </ProjectContainer>
    )
} 
