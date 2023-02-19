import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col,Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { selectUserInfo,selectLoadingState,selectErrorState,LoginUser } from '../../store/auth'
import { useLocation,useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userInformation = useSelector(selectUserInfo)
    const error = useSelector(selectErrorState)
    const loading = useSelector(selectLoadingState)
    console.log(error)

    useEffect(() => {
        if(userInformation){
            navigate(redirect)
        }
    },[navigate,userInformation,redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(LoginUser({email,password}))
    }

    return (
        <Container>
            <h1>Sign In</h1>
            {
                error && <Message variant='danger'>{error}</Message>
            }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Control
                        type='email'
                        placeholder='enter emeail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='mt-3'>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? {' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Login