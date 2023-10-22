import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

const initialState = {
  viewCart: [],
  addCart: [],
  cartStatus: "idle",
};
const addUrl = `${BASE_URL}/cart/addproduct`;
const ProductUrl = `${BASE_URL}/cart/cartdetails`;
export const getCartProducts = createAsyncThunk("cart/get", async () => {
  const data = await axios.get("http://localhost:7000/api/cart/viewcart");
  console.log(data);
  const result = data.data.data;
  return result;
});

export const AddCartProducts = createAsyncThunk("cart/post", async (item) => {
  const data = await axios.post(addUrl,item);
  console.log(data);
  const result = data.data;
  return result;
});

export const RemoveCartProducts = createAsyncThunk("cart/delete", async (id) => {
    const data = await axios.delete(`http://localhost:7000/api/cart/deletecart/${id}`);
    console.log(data);
   // const result = data.data;
    //return result;
  });
///deletecart/:id

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.viewCart = action.payload;
        state.status = "idle";
      })

      .addCase(getCartProducts.rejected, (state, action) => {
        state.status = "error";
      });

    builder
      .addCase(AddCartProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(AddCartProducts.fulfilled, (state, action) => {
        state.addCart = action.payload;
        state.status = "idle";
      })

      .addCase(AddCartProducts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});
export default cartSlice.reducer;

