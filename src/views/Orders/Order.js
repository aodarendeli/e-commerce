import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message/Message';
import { fetchbasketList, reduceBasketQuantity, selectBasketList, increaseBasketQuantity } from '../../store/order';
import './order.scss'
function Order() {
    const dispatch = useDispatch();
    const basketList = useSelector(selectBasketList)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchbasketList(localStorage.getItem("userGuid")))
    }, [dispatch])

    const selectUrl = basketList?.orderModel?.orderEntity?.guid
    const setOrderCheckout = () => {
        navigate(`/checkout/${selectUrl}`)
    }
    const decreaseQuantitiy = (item) => {
        dispatch(reduceBasketQuantity(item))
    }
    const increaseQuantitiy = (item) => {
        dispatch(increaseBasketQuantity(item))
    }
    const summaryTotal = () => {
        let productLength = basketList?.orderModel?.orderItemEntities?.length
        let val = basketList?.orderModel?.orderItemEntities.map(item => item.product.price * item.orderItemEntity.quantity)
        let summaryTotal = val?.reduce((a, b) => a + b, 0)
        return (
            <>
                <h6>Seçilen Ürünler ({productLength})</h6>
                <span>{summaryTotal} TL</span>
            </>
        )
    }

    console.log(basketList)

    return (
        <div className='container'>
            <h3 className='mt-2'>Sepetim</h3>
            <div className='row'>
                <div className='col-lg-8 col-md-8 col-sm-12'>

                    {
                        basketList &&
                        basketList.orderModel.orderItemEntities.map((value, index) => (
                            <>

                                <div className='d-flex basket-container mt-2 mb-3'>
                                    <img src={value?.product?.productPhotoList[0]?.photoUrl} width={120} height={120} />
                                    <Card className='w-100 basket-button-container' key={index}>
                                        <div className=''>
                                            <p>{value.product.name}</p>
                                            <p>{value.product.description}</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='d-flex align-items-center basket-buttons mt-2'>
                                                <i onClick={() => decreaseQuantitiy({ value })} className="fa-solid fa-minus" style={{ color: 'orange' }}></i>
                                                <span>{value.orderItemEntity.quantity}</span>
                                                <i onClick={() => increaseQuantitiy({ value })} className="fa-solid fa-plus" style={{ color: 'orange' }}></i>
                                            </div>
                                            <span>{value?.product?.price} TL</span>
                                        </div>
                                    </Card>
                                </div>

                            </>
                        ))
                    }
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 mt-2 basket-summary'>
                    <Card className='w-100 basket-button-container p-3'>
                        <div>
                            {summaryTotal()}
                        </div>
                        <Button className='mt-3 btn-dark' variant='danger' onClick={() => setOrderCheckout()}>
                            Siparişi Tamamla
                        </Button>
                    </Card>

                </div>
            </div>
        </div>
    )
}
export default Order