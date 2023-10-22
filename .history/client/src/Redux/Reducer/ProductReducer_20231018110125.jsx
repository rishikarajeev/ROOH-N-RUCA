import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    data:[],
    status:'idle'
}

export const getProducts=createAsyncThunk("products/get",async()=>{
    const data=await axios.get("https://fakestoreapi.com/products");
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