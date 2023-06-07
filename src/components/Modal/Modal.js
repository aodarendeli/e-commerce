import React, { useState } from 'react'
import { Modal,Button } from 'react-bootstrap'

function Popup({title,body,show,handleClose}) {
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes */}
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    )
}

export default Popup