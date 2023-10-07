import React from 'react'
impor

function Favourites() {
  return (
    <div>  {cartItems.map((item, i) => (
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

                  <p className="card-text "><CurrencyDisplay amount={item.price} currencySymbol="AED" /></p>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <div className="row">
                  <div className="col-9 text-end ">
                    <div className="row row-cols-3">
                 
                      <div>
                        <span className="fs-5 ms-3 text-start">
                          <i className="fas fa-heart"></i>
                        </span>
                      </div>
                      <div>
                        <h5 className="card-title fs-6 ">
                        <CurrencyDisplay amount={item.subtotal} currencySymbol="AED" />
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}</div>
  )
}

export default Favourites