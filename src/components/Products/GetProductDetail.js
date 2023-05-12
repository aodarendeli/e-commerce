import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectAdmin, selectUserInfo, controlUser } from '../../store/auth';
import { fecthProductSelectedList, selectedProductsList, selectProductsList, swapProducts } from '../../store/products';
import '../../styles/product.scss'
import { fecthOrderList } from '../../store/order';
import Message from '../Message/Message';


const GetProductDetail = () => {
    let params = useParams();
    const [quantity, setQuantitiy] = useState(1)
    const [controlMessage,setControlMessage] = useState(false)
    const navigate = useNavigate();
    const selectUserAdmin = useSelector(controlUser)
    const userGuid = selectUserAdmin.payload.auth.controlUser.guid
    const selectedProductList = useSelector(state=>state.product.selectedProductList?.data?.mainProduct?.id)
    const dispatch = useDispatch()

    

    useEffect(() => {
        dispatch(fecthProductSelectedList(params.id))
    }, [dispatch])

    let selectedProductLister = useSelector(selectedProductsList)

    const setHandleClick = (item) => {
        dispatch(swapProducts(item))
    }

    const setCheckout = () => {
        if(userGuid) {
        let payload = {
            customerGuid: localStorage.getItem("userGuid"),
            productId: selectedProductList,
            quantity: quantity,
            status: "Open",
        }
        dispatch(fecthOrderList(payload))
        setTimeout(() => {
            navigate('/order')
        },[100])
    }
    else{
        setControlMessage(true)
    }
}
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1>Main Product</h1>

                    {selectedProductLister?.mainProduct &&
                        <>
                            <div className='col-4'>

                                <Carousel>
                                    {selectedProductLister?.mainProduct.productPhotoList.map((item, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className=""
                                                src={item.photoUrl}
                                                alt="First slide"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className='col-8 d-flex flex-col product-container'>
                                <span><strong>Koza E-Store </strong>{selectedProductLister?.mainProduct.name} , {selectedProductLister?.mainProduct.description}</span>

                                <span className='product-price'>{selectedProductLister?.mainProduct.price} TL</span>
                                <span className='mt-2'>Beden: {selectedProductLister?.mainProduct.size}</span>
                                <h4>Renk Seçenekleri</h4>
                                <div className='d-flex col-gap'>
                                    {selectedProductLister?.otherProducts.map((item, index) => (
                                        <div key={index}>
                                            <span className='item-box' style={{ backgroundColor: `${item.color}` }} onClick={() => setHandleClick(item)}></span>
                                        </div>
                                    ))}
                                </div>
                                <span>Stok Durumu: {selectedProductLister?.mainProduct.stock}</span>
                                <div className='d-flex'>
                                    <button onClick={() => setQuantitiy(quantity - 1)} disabled={quantity < 2}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantitiy(quantity + 1)}>+</button>
                                </div>


                                <Button onClick={() => setCheckout()} className='mt-3' type='danger'>Sepete Ekle</Button>
                                {
                                    controlMessage && (
                                        <Message variant='info' children="Üye olmadan devam edilemez" />
                                    )
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default GetProductDetail