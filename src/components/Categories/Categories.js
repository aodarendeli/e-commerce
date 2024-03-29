import React from 'react'
import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fecthCategoriesList, selectCategoriesist } from '../../store/categories'
import './categories.scss'

function Categories() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoriesList = useSelector(selectCategoriesist)

    useEffect(() => {
        dispatch(fecthCategoriesList())
    }, [dispatch])
    const setHandleClick = (value) => {
        navigate(`/category/${value.guid}`)
    }
    return (
        <div className='container mt-3'>
            <div className='row'>
                <h3>Categories</h3>
                <Swiper
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                        0: {
                            slidesPerView: 1,
                        },
                    }}
                    spaceBetween={20}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="mt-3"
                >
                    {
                        categoriesList && categoriesList.map((value, index) => (
                            <SwiperSlide key={index}>
                                <div className='col-lg-4 col-md-6 col-sm-12 w-100'>
                                    <Card className='product-categories' onClick={() => setHandleClick(value)}>
                                        <div className='d-flex justify-content-between align-items-center px-3'>
                                            {value.name}
                                            <img className='img-fluid' src='https://themewagon.github.io/cozastore/images/banner-01.jpg' />
                                        </div>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Categories