import React from 'react'
import { useLocation } from 'react-router-dom'

function PlacedOrder() {
    const location=useLocation();
    const data=location.state;
  return (
    <div cl> 
    <h1>Thank You for Your Order! {data.name}</h1>
    <p>Your order has been successfully placed.</p>
    <p>Address:{data.address}</p>
    <p>{data.city}</p>
    <p>{data.phone}</p>
    <p>Delivery:{data.delivery}</p>
    <p>Payment Mode:{data.paymentype}</p>
    <p>We appreciate your business!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder