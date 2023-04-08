import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/Campaign/Campaign'
import Slider from '../../components/Slider/Slider';
import Products from '../../components/Products/Products';

function Dashboard() {


  return (
    <>
      {/* <Slider />
      <Campaign /> */}
      <Products />
      </>
  )
}

export default Dashboard
