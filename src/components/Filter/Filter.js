import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap';

function Filter({ productList }) {
    const [price, setPrice] = useState(0)
    const [filter, setFilter] = useState("select color")
    const [size, setSize] = useState("select size")
    const [colorFilter, setColorFilter] = useState([{ id: 1, color: "red" }, { id: 2, color: 'orange' }, { id: 3, color: 'blue' }])
    const [sizeFilter, setSizeFilter] = useState([{ id: 1, size: "XS" }, { id: 2, size: 'S' }, { id: 3, size: 'M' },{ id: 4, size: 'L' },{ id: 5, size: 'XL' },])


    const setHandleClick = (item) => {
        setFilter(item.color)
    }
    const setHandleClickSize = (item) => {
        setSize(item.size)
    }
    const setApplyFilter = () => {
        const priceVal = productList.map(item => item.price)
        console.log("priceVal",parseInt(priceVal))
        const result = priceVal.filter(item => item === parseInt(price))
        console.log("result",result)
    }
    return (
        <div className='container'>
            <div className='price-filter mt-3 mb-3'>
                <h5>Price</h5>
                <Form.Label>{price}</Form.Label>
                <Form.Range min={0} max={1000} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className='color-filter mt-3 mb-3'>
                <h5>Color</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" placeholder='select color'>
                        {filter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            colorFilter && colorFilter.map((item => (
                                <Dropdown.Item onClick={(e) => setHandleClick(item)}>{item.color}</Dropdown.Item>
                            )))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='size-filter mt-3 mb-3'>
                <h5>Size</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic-size" placeholder='select size'>
                        {size}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            sizeFilter && sizeFilter.map((item => (
                                <Dropdown.Item onClick={(e) => setHandleClickSize(item)}>{item.size}</Dropdown.Item>
                            )))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='filter-button mt-3 mb-3 '>
                <Button className='btn-dark' onClick={() => setApplyFilter()}>
                    Filtereleri Uygula
                </Button>
            </div>
        </div>
    )
}

export default Filter