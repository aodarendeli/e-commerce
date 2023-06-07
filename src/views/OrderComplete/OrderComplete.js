import 'react-credit-cards-2/dist/es/styles-compiled.css';
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import './order.scss'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchpaymentList, selectPaymentList } from '../../store/order';
import Popup from '../../components/Modal/Modal';

function OrderComplete() {
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [date, SetDate] = useState("");
    const [cvc, SetCvc] = useState("");
    const [focus, SetFocus] = useState("");
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()
    let orderGuidsInfo = useSelector(state => state.order?.basketList?.data?.orderModel?.orderEntity?.guid)
    let adressInfo = useSelector(state => state.adress?.allAdressList?.data[0].guid)
    let paymnetListInfo = useSelector(selectPaymentList)
    const handleClose = () => {
        setShow(false)
    }
    const setHandleClick = () => {
        let payload = {
            orderGuid: orderGuidsInfo,
            customerGuid: localStorage.getItem("userGuid"),
            addressGuid: adressInfo,
            creditCardDto: {
                cardNo: number,
                cvv: cvc,
                cardExpireYear: date,
                cardExpireMonth: "10",
                cardHolderName: name
            }
        }
        dispatch(fetchpaymentList(payload))
        if (paymnetListInfo == true) {
            setShow(true)
        }

        // if (paymnetListInfo == true) {
        //     <Popup title="Sipariş Durumu" body="Ödeme Başarıyla alındı" />
        // }
    }
    return (
        <>
            {paymnetListInfo == true && <Popup handleClose={handleClose} show={show} title="Sipariş Durumu" body="Ödeme Başarıyla alındı" />
            }
            <div className='container'>
                <div className='row'>
                    <h6 className='text-center mt-2 mb-3'>Ödeme Alanı</h6>
                    <div className='col-lg-8'>
                        <div clasName="rccs__card rccs__card--unknown">
                            <Cards
                                number={number}
                                name={name}
                                expiry={date}
                                cvc={cvc}
                                focused={focus}
                            />
                        </div>

                        <br />
                        <form>
                            <div className="row">
                                <div className="col-sm-11">
                                    <label for="name">Card Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={number}
                                        name="number"
                                        onChange={(e) => {
                                            SetNumber(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)}
                                    ></input>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-11">
                                    <label for="name">Card Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        name="name"
                                        onChange={(e) => {
                                            SetName(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)}
                                    ></input>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-6">
                                    <label for="name">Expiration Date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => {
                                            SetDate(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)}
                                    ></input>
                                </div>
                                <div className="col-sm-5">
                                    <label for="name">CVV</label>
                                    <input
                                        type="tel"
                                        name="cvc"
                                        className="card"
                                        value={cvc}
                                        onChange={(e) => {
                                            SetCvc(e.target.value);
                                        }}
                                        onFocus={(e) => SetFocus(e.target.name)}
                                    ></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-lg-4'>
                        <Button className='btn-dark' onClick={() => setHandleClick()}>
                            Siparişi Onayla
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderComplete