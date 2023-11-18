import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom'
import { getCartProducts } from '../../Redux/Reducer/CartReducer';
import CurrencyDisplay from '../../Components/Currency';




function PlacedOrder() {
    const location=useLocation();
    const data=location.state;
    const dispatch = useDispatch();
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
    { cartItems?
        cartItems.map((item, i) => (
          <div className="card p-1 border border-white mx-auto" key={item._id}>
            <div className="card ">
              <div className="row ">
                <div className="col-sm-4 d-grid gap-2 d-md-flex justify-content-md-start  ">
                  <div className="row">
                    <div className="col">
                      <img
                        src={`/images/${item.image}`}
                        className="img-fluid rounded-start cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="col justify-content-md-start p-2 ">
                      <h4 className="card-title fs-6">{item.name}</h4>

                      <p className="card-text ">
                        <CurrencyDisplay
                          amount={item.price}
                          currencySymbol="AED"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-body">
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      :  <div>Cart is Empty</div>
    } 
    </div>
    <p>We appreciate your Time!</p>
    {/* You can add more details or a link to track the order here */}
  </div>
  )
}

export default PlacedOrder