import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/Campaign/Campaign'
import Slider from '../../components/Slider/Slider';

function Dashboard() {


  return (
    <>
      <Slider />

      <h1>
        Kampanyalar
      </h1>
      <Campaign />
      </>
  )
}

export default Dashboard
