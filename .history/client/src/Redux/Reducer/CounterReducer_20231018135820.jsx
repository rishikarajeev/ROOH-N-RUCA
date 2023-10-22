import {  createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:"counter",
     initialState:{
        value:0
    },
    //reducer functions
    reducers:{
        increment:(state,action)=>{
            state.value+=1;

        },
        decrement:(state,action)=>{
            if(state.value>0){
            state.value-=1;
            }
           // state.value=state.value-1;

        }
        
    }
})

export default counterSlice.reducer;
export const {increment,decrement}=counterSlice.actions;
