import styled, { css } from "styled-components"
import Modal from "./modal"
import { MouseEventHandler, RefObject } from "react"

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

interface ProjectModalProps {
    dialog: RefObject<HTMLDialogElement>,
    closeDialog: () => void,
    nameError: string | undefined,
    nameInput: RefObject<HTMLInputElement>,
    descriptionInput: RefObject<HTMLTextAreaElement>,
    deadlineError: string | undefined,
    deadlineInput: RefObject<HTMLInputElement>,
    callback: MouseEventHandler<HTMLButtonElement>,
    buttonLabel: string
}

const ProjectModal = ({ dialog, closeDialog, nameError, buttonLabel, nameInput, descriptionInput, deadlineError, deadlineInput, callback }: ProjectModalProps) => {
    return (
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
                <ModalButton onClick={callback}>{buttonLabel}</ModalButton>
            </ModalGroup>
        </Modal>
    )
}

export default ProjectModal