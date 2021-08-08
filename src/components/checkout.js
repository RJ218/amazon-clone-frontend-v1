import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './checkout.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function Checkout({modalIsOpen, closeModal, setIsOpen, currentProduct, currentUser}) {
    let subtitle;
    const [orderId, setOrderId] = useState('')

    var orderInfo = {
        ProductId: currentProduct.id,
        UserId: currentUser.id
    }

    const placeOrder = () => {
        console.log(modalIsOpen)
        console.log(currentUser)
        fetch('https://amazon-clone-v-1-0.herokuapp.com/saveOrder', {
            method:'POST',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)    
        }).then(response => response.json()).then(data =>{
            console.log(data)
            setOrderId(data._id)
        })
    }

    useEffect(() => {
        if(modalIsOpen){placeOrder()}
    }, [modalIsOpen])


  function afterOpenModal() {
   
  }

  function closeModal(isOpen) {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 >Order Confirmed</h2>
        <div className='orderInfo'>
        <p><big>orderId: </big><small>{orderId}</small></p>
        <p><big>userEmail: </big><small>{currentUser.Email}</small></p>
        <p><big>price: </big><small>{currentProduct.price}</small></p>
        </div>
        <button onClick={closeModal}>close</button>
        
        
      </Modal>
    </div>
  );
}

export default Checkout;