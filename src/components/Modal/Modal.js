import './Modal.css';
import React from 'react';
const Modal = ({open, setOpen, children}) => {
return open ?
                    <div className="modal modal__overlay" onClick={e => setOpen(false)}>
                        <div className="modal__inner" onClick={e => e.stopPropagation()}>
                            <h1>Это модалка</h1>
                            {children}
                        </div>
                    </div>
        : null;
}

export default Modal;