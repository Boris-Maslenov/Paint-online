import { useRef } from 'react';
import './Modal.css';
import React from 'react';

    const Modal = ({open, setOpen, children}) => {
    const modalRef = useRef();

    if(open){
        setTimeout(() => {
            modalRef.current.classList.add('modal__overlay_active');
        }, 200);
    }

    return open ?
            <div ref={modalRef} className="modal modal__overlay" onClick={e => setOpen(true)}>
                <div className="modal__inner" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        : null;
    }

export default Modal;