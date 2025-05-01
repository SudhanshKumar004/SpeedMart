import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addItem: (state, action) => {
            const cartdata = state.cartItems.filter(key=>key.id == action.payload.id)
            if(cartdata.length >= 1){
                alert("Item already exist in cart");
            }
            else{
                state.cartItems.push(action.payload);
            }
        },

        removeItem:(state,action)=>{
            state.cartItems = state.cartItems.filter(key=>key.id != action.payload.id)
        },

        quantityInc:(state,action)=>{
            for(let i = 0; i < state.cartItems.length;i++)
            {
                if(state.cartItems[i].id == action.payload.id)
                {
                    state.cartItems[i].qnty++;
                }
            }
        },

        quantityDec:(state,action)=>{
            for(let i = 0; i < state.cartItems.length;i++)
            {
                if(state.cartItems[i].id == action.payload.id)
                {
                    if(state.cartItems[i].qnty <= 1)
                    {
                        alert("Item quantity can't be less than 1");
                    }

                    else{
                    state.cartItems[i].qnty--;
                    }
                }
            }
        }
    }
});

export const { addItem, removeItem, quantityInc, quantityDec } = cartSlice.actions;
export default cartSlice.reducer;