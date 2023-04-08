import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fecthProductList, selectProductsList } from '../../store/products';
import ProductDetail from './ProductDetail';

const Products = () => {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductsList)
    // console.log(productList)

    useEffect(() => {
        dispatch(fecthProductList())
    }, [dispatch])

    return (
        <div className='container mt-3 mb-3'>
            <div className='row'>
                <div className='col d-flex flex-wrap row-gap col-gap'>
                    <ProductDetail productList={productList} />
                </div>
            </div>
        </div>
    )
}

export default Products