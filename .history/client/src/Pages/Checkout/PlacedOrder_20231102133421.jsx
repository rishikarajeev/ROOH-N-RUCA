import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom'
import { getCartProducts } from '../../Redux/Reducer/CartReducer';



function PlacedOrder() {
    const location=useLocation();
    const data=location.state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.viewCart);
    const total = useSelector((state) => state.cart.total);
    useEffect(() => {
        dispatch(getCartProducts());
      }, [dispatch]);
  return (
    <div className='container m-3 '> 
    <h1>Thank You for Your Order! {data.name}</h1>
    <p>Your Order has been successfully placed.</p>
    <div className='border border-dark p-3'>
    <p>Address:{data.address}</p>
    <p>{data.city}</p>
    <p>{data.phone}</p>
    <p>Delivery:{data.delivery}</p>
    <p>Payment Mode:{data.paymentype}</p>
    
    </div>
    <p>We appreciate your Time!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder