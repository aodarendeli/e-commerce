import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import { fecthRegisterUser } from '../../store/auth'
import { selectUserInfo } from '../../store/auth'




function Register() {
    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    let navigate = useNavigate();
    let location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userInformation = useSelector(selectUserInfo)

    useEffect(() => {
        if (userInformation) {
            navigate(redirect)
        }
    }, [navigate, userInformation, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // if (password !== confirmPassword) {
        //     // setMessage('Password dont match !')
        //     console.log('wrong')
        // }
        // else {
        dispatch(fecthRegisterUser({ username, password }))
        // }
    }

    return (
        <Container className='sign-container'>
            <h6>Sign Up</h6>
            {/* {message && <Message variant='danger'>{message}</Message>}
            {
                error && <Message variant='danger'>{error}</Message>
            }
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='mt-3'>
                    <Form.Control
                        type='name'
                        placeholder='enter name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='email' className='mt-3'>
                    <Form.Control
                        type='email'
                        placeholder='enter emeail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group> */}
                <Form.Group controlId='password' className='mt-3'>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                {/* 
                <Form.Group controlId='password' className='mt-3'>
                    <Form.Control
                        type='password'
                        placeholder='confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group> */}
                <Button type='submit' variant='primary' className='mt-3 btn-dark'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account ? {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Register