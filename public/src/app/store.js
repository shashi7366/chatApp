import {configureStore} from "@reduxjs/toolkit";
import contactReducer from "../feature/contactSlice";


const store=configureStore({
    reducer:{
        contacts:contactReducer
    }
});

export default store;