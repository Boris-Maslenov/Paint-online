import { useRef } from 'react';
import './Modal.css';
import React from 'react';

    const Modal = ({open, setOpen, children}) => {
    // console.log('Modal');
    const modalRef = useRef();

    if(open){
        setTimeout(() => {
            modalRef.current.classList.add('modal__overlay_active');
        }, 200);
    }

    return open ?
            <div ref={modalRef} className="modal modal__overlay" onClick={e => setOpen(false)}>
                <div className="modal__inner" onClick={e => e.stopPropagation()}>
                    <h1>Это модалка</h1>
                    {children}
                </div>
            </div>
        : null;
    }

export default Modal;