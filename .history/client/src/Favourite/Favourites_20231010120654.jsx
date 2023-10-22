import React from 'react'

function Favourites() {


  
  return (
    <div>
      <Header />
      <div className="container  bg-white border border-light">
        <h2>Shopping Cart</h2>
        {favouriteData !== null ? (
          favouriteData.map((item, i) => (
            <div
              className="card p-1 border border-white mx-auto"
              key={item._id}
            >
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
                      <div className="row">
                        <div className="col-9 text-end ">
                          <span
                            className="fs-4 ms-3 text-start"
                            onClick={() => toggleFavorite(item._id)}
                          >
                            {isFavorite._id == item._id ||
                            isFavorite.favourite == true ? (
                              <i className="fas fa-heart"></i>
                            ) : (
                              <i className="far fa-heart"></i>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1> WishList is Empty</h1>
        )}
      </div>
    </div>
  );
}


export default Favourites