import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './product.scss'
const ProductDetail = ({ productList }) => {
    const setHandleClick = () => {
        console.log(productList)
    }
    return (
        <>
            <Swiper
                breakpoints={{ 
                    768: {
                      slidesPerView: 3,
                    },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                spaceBetween={30}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                scrollbar={{ draggable: true }}
                navigation


                className="mt-3"
            >
                {productList && productList.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Card className='product-card' style={{ width: 'auto' }} key={index}>
                            <Link to={`/product/${product.id}`}>
                                <Card.Img variant="top" src={product.productPhotoList[0]} style={{ height: '300px', cursor: 'pointer' }} onClick={() => setHandleClick()} />
                            </Link>
                            <Card.Body className='d-flex justify-content-between row'>
                                <Card.Title>{product.name}</Card.Title>
                                <span className='card-price'>{product.price}TL</span>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ProductDetail