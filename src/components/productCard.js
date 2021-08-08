
import React from 'react'
import "./productCard.css"

function ProductCard({ id, title, image, price, openModal, setCurrentProduct, currentUser }) {

    const buyNow =  e => {
        e.preventDefault();
        setCurrentProduct({
            id: id,
            price: price
        })
        openModal()
    }

    return (
        
        <div className='product'>
            <div className='productInfo'>
                <p>{title}</p>
                <p className="productPrice"><small>₹</small><strong>{price}</strong></p>
            </div>
            <img src={image} alt=""></img>
            <button className='buyNow' onClick={buyNow}>Buy Now</button>
        </div>
    )
}

export default ProductCard
