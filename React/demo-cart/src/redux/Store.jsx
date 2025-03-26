import { configureStore } from "@reduxjs/toolkit";

import sliceReducer from './Slice.jsx'
const store = configureStore({
 reducer:{
    MyStoreData : sliceReducer
 }
})
export default store