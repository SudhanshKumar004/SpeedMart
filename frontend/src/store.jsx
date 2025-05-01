import {configureStore} from "@reduxjs/toolkit";
import myreducer from "./CartSlice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, myreducer)

const store = configureStore({
    reducer:{
        myCart:persistedReducer
    }
})

export const persistor = persistStore(store)
export default store