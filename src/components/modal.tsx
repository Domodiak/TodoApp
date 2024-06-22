import { ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Interpolation } from "styled-components/dist/types";

interface DialogProps {
    css?: Interpolation<any>;
}

const Dialog = styled.dialog<DialogProps>`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    
    &::backdrop {
        background: black;
        opacity: 0.5;
    };

    ${ props => props.css }
`

const Modal = forwardRef<HTMLDialogElement, { children: ReactNode, css: Interpolation<any>, tag: String, targetElement: Element | null, [key: string]: any }>(({ children, targetElement, tag, css, ...props}, ref) => {
    if(!targetElement) {
        console.error("Modal element not found!")   
        return null
    }
    return createPortal(
        <Dialog {...props} ref={ref} css={css}>{children}</Dialog>,
        targetElement
    )
})

export default Modal
