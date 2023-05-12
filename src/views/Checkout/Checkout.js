import React, { useEffect, useState } from 'react'
import { Card, FloatingLabel, Form, Dropdown, Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAdressList, fetchGetAdressList, selectAllAdressList } from '../../store/adresses'
import { fetchCheckoutList, fetchCityList, fetchDistrictList, selectCheckoutList, selectCityList, selectDistrictList } from '../../store/checkout'

function Checkout() {
  const params = useParams()
  const dispatch = useDispatch()
  const checkoutList = useSelector(selectCheckoutList)
  const cityList = useSelector(selectCityList)
  const districtList = useSelector(selectDistrictList)
  const allAdressList = useSelector(selectAllAdressList)

  const [description, setDescription] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [postalCode, setPostalCode] = useState("")

  const [selectedCity, setSelectedCity] = useState("İl Seçin")
  const [selectedCityArray, setSelectedCityArray] = useState([])

  const [selectedDistrict, setSelectedDistrict] = useState("İlçe Seçin")
  const [selectedDistrictArray, setSelectedDistrictArray] = useState([])

  useEffect(() => {
    dispatch(fetchCheckoutList(params.id))
    dispatch(fetchGetAdressList())
  }, [dispatch])

  const setHandleCityClick = () => {
    dispatch(fetchCityList())
  }
  const setHandleCityItemsClick = (item) => {
    setSelectedCity(item.name)
    setSelectedCityArray(item)
  }

  const setHandleDistrictClick = (item) => {
    dispatch(fetchDistrictList(item))
  }
  const setHandleDistrictItemsClick = (item) => {
    setSelectedDistrict(item.name)
    setSelectedDistrictArray(item)
  }
  const saveAdress = () => {
    let payload = {
      customerGuid: localStorage.getItem("userGuid"),
      name: localStorage.getItem("userName"),
      districtId: selectedDistrictArray.id,
      cityId: selectedCityArray.id,
      countryId: 1,
      postalCode: postalCode,
      phone: phoneNumber,
      description: description
    }
    dispatch(fetchAdressList(payload))
  }
  return (
    <div className='container'>
      <Row>
        <Col lg={12}>
          <Tabs
            defaultActiveKey="adress"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5"
          >
            <Tab eventKey="adress" title="Adreslerim">
              {
                allAdressList && allAdressList.map(item => (
                  <div key={item.id}>
                    <Card>
                      <Card.Body>{item.description}</Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="saveadress" title="Yeni Adress Ekle">
              <Row>
                <Col lg={6}>
                  <h2>
                    Teslimat Adresi
                  </h2>
                  <div className='d-flex justify-content-between mt-3'>
                    <Dropdown onClick={e => {
                      if (e.target.id === "city") {
                        setHandleCityClick()
                      }
                    }}>
                      <Dropdown.Toggle variant="success" id="city">
                        {selectedCity}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {cityList && (
                          cityList.map((item, index) => (
                            <Dropdown.Item key={index} onClick={() => setHandleCityItemsClick(item)}>
                              {item.name}
                            </Dropdown.Item>
                          ))
                        )
                        }
                      </Dropdown.Menu>
                    </Dropdown>

                    {selectedCity !== "İl Seçin" && (

                      <Dropdown onClick={e => {
                        if (e.target.id === "district") {
                          setHandleDistrictClick(selectedCityArray.code)
                        }
                      }}>
                        <Dropdown.Toggle variant="success" id="district">
                          {selectedDistrict}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {districtList && (
                            districtList.map(item => (
                              <div key={item?.id}>
                                <Dropdown.Item onClick={() => setHandleDistrictItemsClick(item)}>
                                  {item.name}
                                </Dropdown.Item>
                              </div>
                            ))
                          )
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>

                </Col>
              </Row>
              <Row className='mt-3'>
                <Col lg={6}>
                  <FloatingLabel controlId="floatingTextarea2" label="Adres Ekle" className='mt-2'>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <FloatingLabel controlId="floatingInputGrid" label="Phone" className='mt-2'>
                    <Form.Control type="text" placeholder="phone" onChange={(e) => setPhoneNumber(e.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInputGrid" label="Postal Code" className='mt-2'>
                    <Form.Control type="text" placeholder="postalcode" onChange={(e) => setPostalCode(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>

              <Button variant='danger' onClick={() => saveAdress()}>
                Adresi Kaydet
              </Button>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      <div className='d-flex justify-content-between mt-3' style={{ flexWrap: 'wrap', columnGap: '20px', rowGap: '20px' }}>
        {
          checkoutList?.basketEntity?.orderModel?.orderItemEntities.map((item, index) => (
            <div key={index} >
              <Card style={{ width: '18rem' }} >
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>{item.product.name}</Card.Title>
                  <Card.Text>
                    {item.product.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default Checkout