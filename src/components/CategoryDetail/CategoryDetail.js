import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fecthCategoriesListWithId, selectedCategoriesist } from '../../store/categories'
import Filter from '../Filter/Filter'
import ProductDetail from '../Products/ProductDetail'

function CategoryDetail() {
    const dispatch = useDispatch()
    const params = useParams()
    const selectedList = useSelector(selectedCategoriesist)
    console.log("list", selectedList)

    useEffect(() => {
        dispatch(fecthCategoriesListWithId(params?.id))
    }, [dispatch])

    return (
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-sm-4'>
                    <Filter  productList={selectedList} />
                </div>
                <div className='col-sm-8'>
                    <ProductDetail productList={selectedList} />
                </div>
            </div>
        </div>
    )
}

export default CategoryDetail