import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function PlacedOrder() {
    const [data,setData]=useState();
    const location=useLocation();
   setData(location.state);
  return (
    <div>
    <h1>Thank You for Your Order!</h1>
    <p>Your order has been successfully placed.</p>
    <p></p>
    <p>We appreciate your business!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder