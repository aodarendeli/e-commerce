import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import { selectUserInfo, selectLoadingState, selectErrorState, LoginUser, checkAdmin, selectAdmin, controlUser } from '../../store/auth'
import { useLocation, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import './login.scss'

function Login() {
    const [username, seUsername] = useState("")
    const [password, setPassword] = useState("")

    let location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userInformation = useSelector(selectUserInfo)
    const user = userInformation && jwt(userInformation.data)
    localStorage.setItem("userGuid",user?.Guid)
    localStorage.setItem("userName",user?.Name)
    const selectAdmins = useSelector(selectAdmin)


    let userVal = selectAdmins?.data?.find(val => val?.username == user?.Name)
    
    useEffect(() => {
        if (userVal) {
            dispatch(controlUser(userVal))
        }
    }, [userVal, dispatch])


    const error = useSelector(selectErrorState)
    const loading = useSelector(selectLoadingState)

    useEffect(() => {
        if (userInformation) {
            navigate(redirect)
        }
    }, [navigate, userInformation, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(LoginUser({ username, password }))
        dispatch(checkAdmin())
        // dispatch(controlUser(selectAdmins))
    }

    // useEffect(() => {
    //     dispatch(controlUser(userVal))
    // }, [dispatch])

    return (
        <Container className='sign-container'>
            <h6 className='mt-2 mb-2'>Sign In</h6>
            {
                error && <Message variant='danger'>{error}</Message>
            }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='usernmae'>
                    <Form.Control
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={(e) => seUsername(e.target.value)}>
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

                <Button className="btn-dark mt-3" type='submit' variant='primary'>
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