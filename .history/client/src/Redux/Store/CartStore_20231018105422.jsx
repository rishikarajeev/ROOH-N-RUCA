import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import CartReducer from "../Reducer/CartReducer";
import { fetchproducts } from "../Reducer/ProductReducer";

const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchproducts,
    cart:CartReducer
  },
});
export default store;
