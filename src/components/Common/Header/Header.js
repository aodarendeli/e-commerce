import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { logout, selectUserInfo } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import './header.scss'


function Header() {
  const dispatch = useDispatch()
  const userInformation = useSelector(selectUserInfo)
  const val = useSelector(state => state?.order?.basketList?.data?.orderModel?.orderItemEntities.length)

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
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>Free-Store</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            {/* <Nav className="me-auto">
              <Link to="/cart" className='nav-link'>
                <i className="fas fa-cart-shopping me-2"></i>{t('Shopping')}
              </Link>
            </Nav> */}
            {userInformation &&
              // <Nav className="me-auto">
              //   <Link to="/order" className='nav-link'>
              //     <i className="fas fa-cart-shopping me-2"></i>Order
              //   </Link>
              // </Nav>
              <></>
            }

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
                <>
                  <Nav className="me-auto">
                    <Link to="/order" className='nav-link'>
                      <div className='shopping'>
                        <i className="fas fa-cart-shopping me-2">
                          <span className='shopping-count'>{val}</span>
                        </i>Sepetim

                      </div>
                    </Link>
                  </Nav>
                  <Link to="/" className='nav-link d-flex align-items-center' onClick={logoutHandler}>
                    <i className="fas fa-user mx-2"></i>
                    <span>{userInformation.name}</span>
                    <span className='mx-2'>logout</span>
                  </Link>

                  {/* <Link to="/addcampaign">
                    <span className='mx-2'>Add Campaign</span>
                  </Link> */}
                </>
              ) :
                <Link to="/login" className='nav-link'>
                  <i className="fas fa-user mx-2"></i>login
                </Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  );
}

export default Header;