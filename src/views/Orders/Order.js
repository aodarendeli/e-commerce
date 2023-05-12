import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message/Message';
import { fetchbasketList, selectBasketList } from '../../store/order';
function Order() {
    const dispatch = useDispatch();
    const basketList = useSelector(selectBasketList)
    const navigate = useNavigate()
    console.log("sepet", basketList)
    useEffect(() => {
        dispatch(fetchbasketList(localStorage.getItem("userGuid")))
    }, [dispatch])

    const selectUrl = basketList?.orderModel?.orderEntity?.guid
    const setOrderCheckout = () => {
        navigate(`/checkout/${selectUrl}`)
    }
    return (
        <div className='container'>
            <h1>Siparişlerim</h1>
            {
                basketList && 
                    basketList.orderModel.orderItemEntities.map((value, index) => (
                        <>
                            <Card key={index}>
                                <div className='d-flex justify-content-between'>
                                    <p>{value.product.name}</p>
                                    <p>{value.product.price} TL</p>
                                    <p>{value.product.size}</p>
                                    <p>{value.product.description}</p>
                                </div>
                            </Card>
                        </>
                    ))

               
            }
             <Button className='mt-3' variant='danger' onClick={() => setOrderCheckout()}>
                Siparişi Tamamla
              </Button>
        </div>
    )
}
export default Order