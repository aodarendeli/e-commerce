import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import './error.scss'
function Error() {
  return (
    <div className='error-container'>
      <div className="container mainbox  mt-2 mb-2">
        <div className="mx-2">4</div>
        <i className="far fa-question-circle fa-spin mx-2"></i>
        <div className="mx-2">4</div>
      </div>
      <div className='text-center mt-2 mb-2'>
        Giriş Yapmak İçin
        <Link to="/login">
          <span className='mx-2 cursor-link'>Tıklayınız</span>
        </Link>
      </div>
      <Link to="/">
        <div className='text-center mt-2 mb-2'>
          <Button className='btn-dark mt-3'>Anasayfaya Git</Button>
        </div>
      </Link>
    </div>
  )
}

export default Error