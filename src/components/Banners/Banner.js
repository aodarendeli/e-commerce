import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './index.scss'
function Banner() {
    return (
        <div className='container mt-5 mb-3'>
            <div className='d-flex justify-content-between mt-3 mb-3'>
                <h3>Free Store</h3>
                <div className='d-flex banner-header'>
                    <h5 className='mx-2'>Siparişlerim</h5>
                    <span>-</span>
                    <h5 className='mx-2'>Müşteri Hizmetleri</h5>
                </div>
            </div>
            <Row className='text-center'>
                <Col lg={3} className="d-flex row border-right mx-1">
                    <span className='mb-2'>Yarın Kapında</span>
                    <img src='https://images.hepsiburada.net/assets/sfstatic/Content/images/mobil-yarin-kapinda.svg' width={175} height={175} />
                    <span className='mt-2'>Yarın Kapında ile ihtiyaçlarına ertesi gün sahip ol</span>
                </Col>
                <Col lg={3} className="d-flex row border-right mx-1">
                    <span className='mb-2'>Tek Tıkla Güvenli Alışveriş</span>
                    <img src='https://images.hepsiburada.net/assets/sfstatic/Content/images/mobil-tek-tikla-alisveris.svg' width={175} height={175} />
                    <span className='mt-2'>Yarın Kapında ile ihtiyaçlarına ertesi gün sahip ol</span>
                </Col>
                <Col lg={3} className="d-flex row border-right mx-1">
                    <span>Mobil Cebinizde</span>
                    <img className='mb-2' src='https://images.hepsiburada.net/assets/sfstatic/Content/images/mobil-cebinizde.svg' width={175} height={175} />
                    <span className='mt-2'>Yarın Kapında ile ihtiyaçlarına ertesi gün sahip ol</span>
                </Col>
                <Col lg={3} className="d-flex row">
                    <span className='mb-2'>Kapında İade</span>
                    <img src='https://images.hepsiburada.net/banners/0/imageUrl2107_20230116110649.png' width={155} height={175} />
                    <span className='mt-2'>Yarın Kapında ile ihtiyaçlarına ertesi gün sahip ol</span>
                </Col>
            </Row>
        </div>
    )
}

export default Banner