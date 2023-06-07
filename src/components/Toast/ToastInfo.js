import React from 'react'
import { Toast } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastInfo({ body, onClose, show, title }) {
    return (
        <ToastContainer position="top-end" className='mt-5'>
            <Toast onClose={onClose} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{body}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastInfo