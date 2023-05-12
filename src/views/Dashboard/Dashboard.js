import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/Campaign/Campaign'
import Slider from '../../components/Slider/Slider';
import Products from '../../components/Products/Products';
import Categories from '../../components/Categories/Categories';
import Banner from '../../components/Banners/Banner';

function Dashboard() {


  return (
    <>
      {/* 
      <Campaign /> */}
      <Slider />
      <Categories />
      <Products />
      <Banner />
      </>
  )
}

export default Dashboard
