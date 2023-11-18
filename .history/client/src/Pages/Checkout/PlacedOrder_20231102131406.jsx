import React from 'react'
import { useLocation } from 'react-router-dom'

function PlacedOrder() {
    con
    const data=useParams('state');
  return (
    <div>
    <h1>Thank You for Your Order!{data}</h1>
    <p>Your order has been successfully placed.</p>
    <p>We appreciate your business!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder