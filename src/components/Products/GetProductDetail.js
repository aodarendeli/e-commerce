import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Form, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { selectAdmin, selectUserInfo, controlUser } from '../../store/auth';
import { fecthProductSelectedList, selectedProductsList, selectProductsList, swapProducts } from '../../store/products';
import '../../styles/product.scss'
import { fecthOrderList,selectOrderList } from '../../store/order';
import Message from '../Message/Message';
import ToastInfo from '../Toast/ToastInfo';

const GetProductDetail = () => {
    let params = useParams();
    const [quantity, setQuantitiy] = useState(1)
    const [show, setShow] = useState(false);
    const [controlMessage, setControlMessage] = useState(false)
    const navigate = useNavigate();
    const selectUserAdmin = useSelector(controlUser)
    const userGuid = selectUserAdmin.payload.auth.controlUser.guid
    const selectedProductList = useSelector(state => state.product.selectedProductList?.data?.mainProduct?.id)
    const dispatch = useDispatch()
    const selectOrderListInfo = useSelector(selectOrderList)
    
    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {
        dispatch(fecthProductSelectedList(params.id))
    }, [dispatch])

    let selectedProductLister = useSelector(selectedProductsList)

    const setHandleClick = (item) => {
        dispatch(swapProducts(item))
    }

    const setCheckout = () => {
        if (userGuid || localStorage.getItem("userGuid")) {
            let payload = {
                customerGuid: localStorage.getItem("userGuid"),
                productId: selectedProductList,
                quantity: quantity,
                status: "Open",
            }
            dispatch(fecthOrderList(payload))
            if (selectOrderListInfo) {
                setShow(true)
            }
        }
        else {
            setControlMessage(true)
        }
    }

    return (
        <>
        {selectOrderListInfo && <ToastInfo onClose={handleClose} show={show} title="Ürün Ekleme" body="Ürün Başarıyla Sepete Eklendi." />}
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

                                <Button onClick={() => setCheckout()} className='mt-3 btn-dark' type='danger'>Sepete Ekle</Button>
                                {
                                    controlMessage && (
                                        <Message variant='info' children="Üye olmadan devam edilemez" />
                                    )
                                }
                            </div>
                        </>
                    }
                </div>

                <div className='col-lg-12 col-md-12 col-sm-12 mt-5 mb-3 product-detail'>
                    <Tabs
                        defaultActiveKey="product-desc"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="product-desc" title="Ürün Açıklaması">
                            <div className='d-flex row'>
                                <span className='mt-1 mb-1'>Ürün Açıklaması: {selectedProductLister?.mainProduct?.description}</span>
                                <span className='mt-1 mb-1'>Ürün Adı: {selectedProductLister?.mainProduct?.name}</span>
                                <span className='mt-1 mb-1'>Ürün Kodu: {selectedProductLister?.mainProduct?.productCode}</span>
                                <span className='mt-1 mb-1'>Ürün Fiyatı: {selectedProductLister?.mainProduct?.price} TL</span>

                            </div>
                        </Tab>
                        <Tab eventKey="product-buy" title="Taksit Seçenekleri">
                            <div className='d-flex row'>
                                <span className='mt-1 mb-1'>
                                    * Bazı vade tutarları ortalama değerlerdir, ödeme adımında ürünlerin KDV’lerinin farklılıklarından dolayı değişkenlik gösterebilir.
                                </span>
                                <span className='mt-1 mb-1'>
                                    * Ödeme esnasında erteleme işlemi seçilen taksitlerde vade farkından dolayı tutar farklılıkları görülebilir.
                                </span>
                            </div>
                        </Tab>
                        <Tab eventKey="price-info" title="Güvenli Ödeme">
                            <div className='d-flex row'>
                                <span className='mt-1 mb-1'>
                                    * Bazı vade tutarları ortalama değerlerdir, ödeme adımında ürünlerin KDV’lerinin farklılıklarından dolayı değişkenlik gösterebilir.
                                </span>
                                <span className='mt-1 mb-1'>
                                    * Ödeme esnasında erteleme işlemi seçilen taksitlerde vade farkından dolayı tutar farklılıkları görülebilir.
                                </span>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default GetProductDetail