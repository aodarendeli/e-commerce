import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { logout, selectUserInfo } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';



function Header() {
  const dispatch = useDispatch()
  const userInformation = useSelector(selectUserInfo)
  const { t, i18n } = useTranslation();
  const [type, setType] = useState('tr');

  const logoutHandler = () => {
    dispatch(logout())
  }

  const changeLanguage = lng => {
    setType(lng.target.value);
    i18n.changeLanguage(lng.target.value);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>E-Commerce</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="me-auto">
              <Link to="/cart" className='nav-link'>
                <i className="fas fa-cart-shopping me-2"></i>{t('Shopping')}
              </Link>
            </Nav>
            <Nav>
              <Form.Control as="select"
                onChange={(event) => { changeLanguage(event) }}
              >
                <option value="tr">tr</option>
                <option value="en">en</option>
              </Form.Control>
            </Nav>

            <Nav>
              {userInformation ? (
                <Link to="/" className='nav-link' onClick={logoutHandler}>
                  <i className="fas fa-user mx-2"></i>
                  <span>{userInformation.name}</span>
                  <span className='mx-2'>logout</span>
                </Link>
              ) :
                <Link to="/login" className='nav-link'>
                  <i className="fas fa-user mx-2"></i>login
                </Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;