import { configureStore } from "@reduxjs/toolkit";
import  Authreducer from "./Authslice"
import AuthSlice from "./Authslice";
import mailreducer from "./mailSlice";
const store=configureStore({
    reducer:{
      auth:Authreducer,
      mail:mailreducer
    }
});
export default store;
