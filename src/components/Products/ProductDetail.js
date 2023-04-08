import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const ProductDetail = ({ productList }) => {
    const setHandleClick = () => {
        console.log(productList)
    }
    return (
        <>
            {productList && productList.map((product,index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Link to={`/product/${product.id}`}>
                            <Card.Img variant="top" src={product.productPhotoList[0]} style={{ height: '300px', cursor: 'pointer' }} onClick={() => setHandleClick()} />
                        </Link>
                        <Card.Body className='d-flex justify-content-between'>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: {product.price}</Card.Text>

                        </Card.Body>
                        <Card.Body className='d-flex justify-content-between'>
                            <Card.Text>Size: {product.size}</Card.Text>
                            <Card.Text>Color: {product.color}</Card.Text>
                            <Card.Text>Stock: {product.stock}</Card.Text>
                        </Card.Body>

                    </Card>
                </div>
            ))}
        </>
    )
}

export default ProductDetail