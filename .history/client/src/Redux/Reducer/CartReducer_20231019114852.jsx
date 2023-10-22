import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

const initialState = {
  viewCart: [],
  addCart: [],
  updatedCart: [],
  cartStatus: "idle",
};
const usertoken = sessionStorage.getItem("usertoken");
const addCartUrl = `${BASE_URL}/cart/addproduct`;
const deleteCartUrl = `${BASE_URL}/cart//deletecartproduct/:id`;

const CartProductsUrl = `${BASE_URL}/cart/cartdetails`;
export const getCartProducts = createAsyncThunk("cart/get", async () => {
  const data = await axios.get(CartProductsUrl,{  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer-token ${usertoken}`,
  },});
  console.log(data);
  const result = data.data.data;
  return result;
});

export const AddCartProducts = createAsyncThunk("cart/post", async (item) => {
  const data = await axios.post(addCartUrl,item);
  console.log(data);
  const result = data.data;
  return result;
});

export const RemoveCartProducts = createAsyncThunk("cart/delete", async (_id) => {
    const data = await axios.delete(`${BASE_URL}/cart/deletecartproduct/${_id}`);
    console.log(data);

  });
  export const RemoveAllCartProducts = createAsyncThunk("cart/delete", async (username) => {
    const data = await axios.delete(`${BASE_URL}/cart/deleteallproducts/${username}`);
    console.log(data);

  });


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    "INCREMENT_PRODUCT":
             {
                ...state,
                cartProducts: state.viewCart.map((item) => {
                    if(item.id === action.payload.id) {
                        item.quan += action.payload.increment;
                    }
                    return item;
                })
            }
  },
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

