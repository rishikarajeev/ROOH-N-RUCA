import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";

import CartReducer from "../Reducer/CartReducer";

const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: f,
    cart:CartReducer
  },
});
export default store;
