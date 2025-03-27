import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice.jsx'

const store = configureStore({
     reducer:{
        userData:userSlice
     }
})
export default store;