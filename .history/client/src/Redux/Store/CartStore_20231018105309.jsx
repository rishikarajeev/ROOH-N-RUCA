import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import fetchproducts from "../Reducer/ProductSlice";
import CartSlice from "../Reducer/CartSlice";
const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchproducts,
    cart:CartSlice
  },
});
export default store;
