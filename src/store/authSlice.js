import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata : null,
    status : false
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        login : (state,action)=>{
            state.status = true  
            state.userdata = action.payload 
        },
        logout : (state,action)=>{
            state.status = false 
            state.userdata = null
        }
    }
})

export const {logout,login} = authSlice.actions

export default authSlice.reducer