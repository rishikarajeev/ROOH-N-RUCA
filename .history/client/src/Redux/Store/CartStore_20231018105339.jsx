import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import fetchproducts from "../Reducer/ProductSlice";
import carts
const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchproducts,
    cart:CartSlice
  },
});
export default store;
