import './Modal.css';
import React from "react";

export const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button type="button" onClick={() => handleClose(false)}>
                    Close
                </button>
            </section>
        </div>
    );
};