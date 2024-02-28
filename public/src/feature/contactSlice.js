import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getAllContacts} from "../utils/APIRoutes";
import axios from "axios";


const initialState={
    user:undefined,
    contactDetails:[]
};


export const fetchContacts=createAsyncThunk('contacts/fetchContacts',async (contacts)=>{
    console.log(contacts);
    return axios.post(getAllContacts,{contacts});
})

// export const fetchUser=createAsyncThunk('contacts/fetchUser',async (id)=>{

// })


const contactSlice=createSlice({
    name:"contacts",
    initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.user=action.payload;
           // console.log(state.user)
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