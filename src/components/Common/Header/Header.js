import React from 'react';
import {
  Navbar,
} from 'reactstrap';

import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Navbar
        color="dark"
        expand="xl"
        dark
      >
        <div className='container d-flex justify-content-between'>
          <Link to='/'>
            <i className='fas fa-flight'></i>
            <span className='navbar-brand'>
              <i className='fas fa-plane mx-2'></i>
              Technoly
            </span>
          </Link>
          <div className='justify-content-end'>
            <Link to='/planlauc'>
              <span className='navbar-brand'>
                Planla & Uç
              </span>
            </Link>
            <Link to='/seyehatdeneyimi'>
              <span className='navbar-brand'>
                Seyehat Deneyimi
              </span>
            </Link>
            <Link to='/kesfet'>
              <span className='navbar-brand'>
                Keşfet
              </span>
            </Link>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;