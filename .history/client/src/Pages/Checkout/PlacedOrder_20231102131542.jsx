import React from 'react'
import { useLocation } from 'react-router-dom'

function PlacedOrder() {
    const location=useLocation();
    const data=location.state;
  return (
    <div>
    <h1>Thank You for Your Order!</h1>
    <p>Your order has been successfully placed.</p>
    <p>We appreciate your business!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder