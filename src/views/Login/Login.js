import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";

import {
  selectUserInfo,
  selectLoadingState,
  selectErrorState,
  LoginUser,
  checkAdmin,
  selectAdmin,
  controlUser,
} from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import "./login.scss";

function Login() {
  const [username, seUsername] = useState("");
  const [password, setPassword] = useState("");

  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userInformation = useSelector(selectUserInfo);
  const user = userInformation && jwt(userInformation.data);
  localStorage.setItem("userGuid", user?.Guid);
  localStorage.setItem("userName", user?.Name);
  const selectAdmins = useSelector(selectAdmin);

  let userVal = selectAdmins?.data?.find((val) => val?.username == user?.Name);

  useEffect(() => {
    if (userVal) {
      dispatch(controlUser(userVal));
    }
  }, [userVal, dispatch]);

  const error = useSelector(selectErrorState);
  const loading = useSelector(selectLoadingState);

  useEffect(() => {
    if (userInformation) {
      navigate(redirect);
    }
  }, [navigate, userInformation, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
    dispatch(checkAdmin());
  };

  return (
    <>
      {loading && <Loader />}
      <Container fluid className="full-height p-0">
        <Row className="full-height">
          <Col md={9} className="photo-background full-height"></Col>
          <Col
            md={3}
            className="d-flex justify-content-center align-items-center custom-login-box"
          >
            <div className="login-content">
              <h6 className="mt-2 mb-2 text-center">Giriş Yap</h6>
              {error && <Message variant="danger">{error}</Message>}
              <Form
                onSubmit={submitHandler}
                className="d-flex flex-column align-items-end"
              >
                <Form.Group controlId="usernmae">
                  <Form.Control
                    className="small-input custom-input"
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => seUsername(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Control
                    className="small-input custom-input"
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  className="btn-dark mt-3"
                  type="submit"
                  variant="primary"
                >
                  Sign In
                </Button>
              </Form>
              <Row className="py-3">
                <Col className="d-flex justify-content-end">
                  New Customer?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    Register
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
