import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../Reducer/ProductSlice";
import fetchproducts from "../Reducer/ProductSlice";
import cartsli
const store = configureStore({
  reducer: {
    // products: ProductSlice,
    products: fetchproducts,
    cart:CartSlice
  },
});
export default store;
