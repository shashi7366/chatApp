import {createSlice} from "@reduxjs/toolkit";


const initialState={
    contacts:[]
};


const contactSlice=createSlice({
    name:"contacts",
    initialState,
    reducers:{
        updateContacts:(state,action)=>{
            state.contacts.push(action.payload);
        }
    }
});

export default contactSlice.reducer;
export const {updateContacts}=contactSlice.actions;