import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'ProductData',
    initialState:{
        value:[]
},
reducers:{
    addCartData: (state, action) => {
        const productData = action.payload;
        const pid = productData.id;
    
        // Check if the product already exists in the cart
        const existingProduct = state.value.find((item) => item.productData.id === pid);
            console.log(existingProduct);
            
        if (existingProduct) {
            // If the product exists, increment the quantity
            existingProduct.qty = existingProduct.qty + 1;
        } else {
            // If the product doesn't exist, add it with a qty of 1
            state.value.push({ productData, qty: 1 });
        }
    },

    incrimentQty:(state,action)=>
    {
        var pid = action.payload
        state.value = state.value.map((obj)=>obj.productData.id == pid ? {...obj,qty:obj.qty+1}: obj )

    },
    dicrimentQty:(state,action)=>
        {
            var pid = action.payload
            state.value = state.value.map((obj)=>obj.productData.id==pid ?{...obj,qty:obj.qty>0 ?obj.qty-1 : obj==0}:obj )
        },
        removeData:(state,action)=>
        {
            var pid = action.payload
            state.value = state.value.filter((obj)=>obj.productData.id != pid )

        }
}

})
export const {addCartData,incrimentQty,dicrimentQty,removeData} = slice.actions
export default slice.reducer;