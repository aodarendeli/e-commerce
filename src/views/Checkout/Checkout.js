import React, { useEffect, useState } from 'react'
import { Card, FloatingLabel, Form, Dropdown, Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAdressList, fetchGetAdressList, selectAllAdressList } from '../../store/adresses'
import { fetchCheckoutList, fetchCityList, fetchDistrictList, selectCheckoutList, selectCityList, selectDistrictList } from '../../store/checkout'
import './checkout.scss'

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
  const summaryTotal = () => {
    console.log(checkoutList)
    let productLength = checkoutList?.basketEntity?.orderModel?.orderItemEntities?.length
    let val = checkoutList?.basketEntity?.orderModel?.orderItemEntities.map(item => item.product.price * item.orderItemEntity.quantity)
    let summaryTotals = val?.reduce((a, b) => a + b, 0)
    return (
      <>
        <h6>Seçilen Ürünler ({productLength})</h6>
        <span>{summaryTotals} TL</span>
      </>
    )
  }
  return (
    <div className='container'>
      <Row>
        <Col className='col-lg-8 col-md-8 col-sm-12 product-detail'>
          <h6 className='mt-5'>Adreslerim</h6>
          <Tabs
            defaultActiveKey="adress"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey="adress" title="Adreslerim">
              {
                allAdressList && allAdressList.map(item => (
                  <div key={item.id}>
                    <Card className='adress-container mt-2 mb-2'>
                      <Card.Body>{item.description}</Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="saveadress" title="Yeni Adress Ekle">
              <Row>
                <Col lg={6} className="w-100">
                  <h6>
                    Teslimat Adresi
                  </h6>
                  <div className='d-flex justify-content-between mt-3'>
                    <Dropdown onClick={e => {
                      if (e.target.id === "city") {
                        setHandleCityClick()
                      }
                    }}>
                      <Dropdown.Toggle className='btn-dark' id="city">
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
                        <Dropdown.Toggle className='btn-dark' id="district">
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
              <Row className='mt-3 w-100'>
                <Col lg={6} className="w-100">
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
                <Col lg={6} className='w-100'>
                  <FloatingLabel controlId="floatingInputGrid" label="Phone" className='mt-2'>
                    <Form.Control type="text" placeholder="phone" onChange={(e) => setPhoneNumber(e.target.value)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInputGrid" label="Postal Code" className='mt-2 mb-2'>
                    <Form.Control type="text" placeholder="postalcode" onChange={(e) => setPostalCode(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>

              <Button className='btn-dark' onClick={() => saveAdress()}>
                Adresi Kaydet
              </Button>
            </Tab>
          </Tabs>
          <div className='d-flex justify-content-between mt-3' style={{ flexWrap: 'wrap', columnGap: '20px', rowGap: '20px' }}>
            <h6>Ürünlerim</h6>
            {
              checkoutList?.basketEntity?.orderModel?.orderItemEntities.map((value, index) => (
                <div key={index} className='d-flex basket-container mt-2 mb-3'>
                  <img src={value?.product?.productPhotoList[0]?.photoUrl} width={120} height={120} />
                  <Card className='w-100 basket-button-container' key={index}>
                    <div className=''>
                      <p>{value.product.name}</p>
                      <p>{value.product.description}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <span>{value?.product?.price} TL</span>
                    </div>
                  </Card>
                </div>
              ))
            }
          </div>

        </Col>

        <Col className='col-lg-4 col-md-4 col-sm-12 mb-3 mt-5'>
          <Card className='w-100 basket-button-container p-3'>
            <div>
              {summaryTotal()}
            </div>
            <Button className='mt-3 btn-dark' variant='danger'>
              Siparişi Onayla
            </Button>
          </Card>
        </Col>
      </Row>


    </div>
  )
}


export default Checkout