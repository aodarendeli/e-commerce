import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { fecthSliderList, selectSliderErrorState, selectSliderList, selectSliderLoadingState } from '../../store/slider';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader';
import { WEBSITE_URL } from '../../config/config.js'


function Slider() {
    const dispatch = useDispatch()

    const sliderList = useSelector(selectSliderList)
    const sliderLoading = useSelector(selectSliderLoadingState)

    useEffect(() => {
        dispatch(fecthSliderList())
    }, [dispatch])

    return (
        <>
            {sliderLoading && <Loader />}
            <Carousel>
                {sliderList && sliderList.map(item => (

                    <Carousel.Item key={item.id}>
                        <img
                            className="d-block w-100"
                            src={item.photoUrl}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h2>{item.title}</h2>
                            <h2>{item.text}</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}

export default Slider