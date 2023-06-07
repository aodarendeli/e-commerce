import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fecthCategoriesListWithId, selectedCategoriesist } from '../../store/categories'

function CategoryDetail() {
    const dispatch = useDispatch()
    const params = useParams()
    const selectedList = useSelector(selectedCategoriesist)

    useEffect(() => {
        dispatch(fecthCategoriesListWithId(params.id))
    }, [dispatch])

    return (
        <div className='container'>
            {
                selectedList &&
                <>
                    <h1>
                        {selectedList.name} Kategorisi
                    </h1>
                    <p>{selectedList.description}</p>
                </>
            }
        </div>
    )
}

export default CategoryDetail