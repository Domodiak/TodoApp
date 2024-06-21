import { ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Dialog = styled.dialog`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em;
    z-index: 500;
    
    &::backdrop {
        background: black;
        opacity: 0.5;
    }
`

const Modal = forwardRef<HTMLDialogElement, { children: ReactNode, targetElement: Element | null, [key: string]: any }>(({ children, targetElement, ...props}, ref) => {
    if(!targetElement) {
        console.error("Modal element not found!")   
        return null
    }
    return createPortal(
        <Dialog {...props} ref={ref}>{children}</Dialog>,
        targetElement
    )
})

export default Modal