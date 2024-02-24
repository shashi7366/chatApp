import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getAllContacts} from "../utils/APIRoutes";
import axios from "axios";


const initialState={
    user:undefined,
    contactDetails:[]
};


export const fetchContacts=createAsyncThunk('contacts/fetchContacts',async (contacts)=>{
    return axios.post(getAllContacts,{contacts});
})


const contactSlice=createSlice({
    name:"contacts",
    initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.user=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchContacts.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.contactDetails=action.payload.data.users;
        })
    }
});

export default contactSlice.reducer;
export const {updateUser}=contactSlice.actions;
//fetchContacts=fetchContacts;