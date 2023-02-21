import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addCampaign } from '../../store/campaign'


function AddCampaign() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [inUse, setinUse] = useState(true)
    const [expireDate, setExpireDate] = useState("2023-02-19T14:35:26.177Z")

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addCampaign({ title, text, photoUrl, inUse, expireDate }))
    }

    return (
        <Container className='mt-5'>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='usernmae'>
                    <Form.Control
                        type='text'
                        placeholder='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='text' className='mt-3'>
                    <Form.Control
                        type='text'
                        placeholder='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='photoUrl' className='mt-3'>
                    <Form.Control
                        type='text'
                        placeholder='photoUrl'
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='inUse' className='mt-3'>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        value={inUse}
                        onChange={(e) => setinUse(e.target.value)}
                        checked={true}
                        label="Anasayfada gosterılsın mi ?"
                    />
                </Form.Group>


                <Button type='submit' variant='primary' className='mt-3'>
                    Add Campaign
                </Button>
            </Form>
        </Container>
    )
}

export default AddCampaign