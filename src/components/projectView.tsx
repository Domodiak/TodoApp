import styled from "styled-components";
import { Project } from "../types";

const ProjectContainer = styled.main`
    padding: 1rem;
    width: 100%;
`

const ProjectTitle = styled.h1`
    font-size: 3rem;
    top: -1rem;
    height: 2.5rem;
    position: relative;
`

const ProjectDeadline = styled.p`
    
`

const ProjectDescription = styled.p`

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
