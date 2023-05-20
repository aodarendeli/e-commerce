import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message/Message';
import { fetchbasketList, selectBasketList } from '../../store/order';
import './order.scss'
function Order() {
    const dispatch = useDispatch();
    const basketList = useSelector(selectBasketList)
    const navigate = useNavigate()
    // const [selectedQuantity, setSelectedQuantitiy] = useState(basketList)
    
    // console.log(selectedQuantity)


    useEffect(() => {
        dispatch(fetchbasketList(localStorage.getItem("userGuid")))
    }, [dispatch])


    const selectUrl = basketList?.orderModel?.orderEntity?.guid
    const setOrderCheckout = () => {
        navigate(`/checkout/${selectUrl}`)
    }
    const decreaseQuantitiy = (item) => {
        // if (selectedQuantity && selectedQuantity.map(value => value.filter(val => val.productId == item?.value?.orderItemEntity.productId))) {
        //     return selectedQuantity.quantity - 1;
        // }
    }

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
                                    <img src={value?.product?.productPhotoList[0]?.photoUrl} width={100} height={100} />
                                    <Card className='w-100' key={index}>
                                        <div className=''>
                                            <p>{value.product.name}</p>
                                            {/* <p>{value.product.price} TL</p> */}
                                            {/* <p>{value.product.size}</p> */}
                                            <p>{value.product.description}</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <span>
                                                <div className='d-flex' style={{ padding: '10px' }}>
                                                    {/* {value.orderItemEntity.quantity} */}
                                                    {/* <button onClick={() => decreaseQuantitiy({ value })}>-</button> */}
                                                    <span>{value.orderItemEntity.quantity}</span>
                                                    {/* <button onClick={() => setQuantitiy(quantity + 1)}>+</button> */}
                                                </div>
                                            </span>
                                            <span>{value?.product?.price} TL</span>

                                        </div>
                                    </Card>
                                </div>

                            </>
                        ))
                    }
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <Button className='mt-3' variant='danger' onClick={() => setOrderCheckout()}>
                        Siparişi Tamamla
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Order