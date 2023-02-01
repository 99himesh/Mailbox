import { configureStore } from "@reduxjs/toolkit";
import  Authreducer from "./Authslice"
import AuthSlice from "./Authslice";

const store=configureStore({
    reducer:{
      auth:Authreducer,
    }
});
export default store;
