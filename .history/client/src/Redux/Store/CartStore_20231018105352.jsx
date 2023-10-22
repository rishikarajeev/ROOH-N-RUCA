import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import fetchproducts from "../Reducer/ProductSlice";

const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchproducts,
    cart:CartSl
  },
});
export default store;
