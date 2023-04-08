import React from 'react'
import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fecthCategoriesList, selectCategoriesist } from '../../store/categories'
import './categories.scss'

function Categories() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoriesList = useSelector(selectCategoriesist)
    console.log(categoriesList)

    useEffect(() => {
        dispatch(fecthCategoriesList())
    }, [dispatch])
    const setHandleClick = (value) => {
        navigate(`/category/${value.id}`)
    }
    return (
        <div className='container mt-3'>
            <div className='row'>

                <h3>Categories</h3>

                {
                    categoriesList && categoriesList.map(value => (
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <Card className='product-categories' onClick={() => setHandleClick(value)}>
                                <div className='d-flex justify-content-between align-items-center px-3'>
                                    {value.name}
                                    <img width={300} height={200} src='https://themewagon.github.io/cozastore/images/banner-01.jpg' />
                                </div>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories