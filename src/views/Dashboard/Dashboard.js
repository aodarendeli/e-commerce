import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/Campaign/Campaign'
import Slider from '../../components/Slider/Slider';
import Products from '../../components/Products/Products';
import Categories from '../../components/Categories/Categories';

function Dashboard() {


  return (
    <>
      {/* 
      <Campaign /> */}
      <Slider />
      <Categories />
      <Products />
      </>
  )
}

export default Dashboard
