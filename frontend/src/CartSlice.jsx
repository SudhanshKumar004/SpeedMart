import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const cartdata = state.cartItems.filter(
        (key) => key.id == action.payload.id
      );
      if (cartdata.length >= 1) {
        toast.error("❗ Item Already Exists in your Cart!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      } else {
        state.cartItems.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (key) => key.id != action.payload.id
      );
    },

    quantityInc: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id == action.payload.id) {
          state.cartItems[i].qnty++;
        }
      }
    },

    quantityDec: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id == action.payload.id) {
          if (state.cartItems[i].qnty <= 1) {
            toast.error("❗Quantity can't be less than 1!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              theme: "colored",
            });
          } else {
            state.cartItems[i].qnty--;
          }
        }
      }
    },

    cartClear: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  quantityInc,
  quantityDec,
  cartClear,
} = cartSlice.actions;
export default cartSlice.reducer;
