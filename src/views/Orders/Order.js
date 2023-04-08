import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { fetchbasketList, selectBasketList } from '../../store/order';
function Order() {
    const dispatch = useDispatch();
    const basketList = useSelector(selectBasketList)
    useEffect(() => {
        dispatch(fetchbasketList(localStorage.getItem("userGuid")))
    }, [dispatch])
    return (
        <div className='container'>
            <h1>Siparişlerim</h1>
            {
                basketList &&
                basketList.orderModel.orderItemEntities.map(value => (
                    <Card>
                        <div className='d-flex justify-content-between'>
                            <p>{value.product.name}</p>
                            <p>{value.product.price} TL</p>
                            <p>{value.product.size}</p>
                            <p>{value.product.description}</p>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}
export default Order