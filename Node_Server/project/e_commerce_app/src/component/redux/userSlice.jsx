import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name:'userSlice',
    initialState:{
        value:{isLoginStatus:undefined,role:undefined,user:undefined,token:undefined}
    },
    
   reducers:{
       changeUserInfo:(state,action)=>{
           var data = action.payload;
        //    console.log("User Data is : "+data);
           state.value = data;
        //    console.log(changeUserInfo)
       }
       
   } 
    
})
export  const {changeUserInfo} = slice.actions;
export default slice.reducer;