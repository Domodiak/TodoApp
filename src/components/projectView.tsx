import styled from "styled-components";
import { Project } from "../types";

const ProjectContainer = styled.main`
    padding: 1rem;
    width: 100%;
`

const ProjectTitle = styled.h1`

`

const ProjectDeadline = styled.p`

`

const ProjectDescription = styled.p`

`

export default function ProjectView({ project }: { project: Project | null }) {
    if(!project) {
        return (
            <ProjectContainer>
                No project selected
            </ProjectContainer>
        )
    }
    return (
        <ProjectContainer>
            <ProjectTitle>{ project.name }</ProjectTitle>
            <ProjectDeadline>{ project.deadline.toDateString() }</ProjectDeadline>
            <ProjectDescription>{ project.description }</ProjectDescription>
        </ProjectContainer>
    )
} 