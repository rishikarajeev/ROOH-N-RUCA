import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";


const initialState={
    data:[],
    status:'idle'
}
const usertoken = sessionStorage.getItem("usertoken");
const ProductUrl = `${BASE_URL}/products`;


export const getProducts=createAsyncThunk("products/get",async()=>{
    const data=await axios.get(ProductUrl,  {  headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer-token ${usertoken}`,
      }},);
    const result=data.data;
    return result;
}
);
const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.pending,(state,action)=>{
            state.status="loading";

        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.data=action.payload;
            state.status="idle";
       

        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.status="error";

        })

    }


});
export const {fetchproducts}=productSlice.actions;
export default productSlice.reducer;