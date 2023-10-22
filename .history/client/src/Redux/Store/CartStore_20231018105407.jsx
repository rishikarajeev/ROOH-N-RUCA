import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import fetchproducts from "../Reducer/ProductSlice";
import CartReducer from "../Reducer/CartReducer";

const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchPr,
    cart:CartReducer
  },
});
export default store;
