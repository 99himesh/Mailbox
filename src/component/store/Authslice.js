import { createSlice } from "@reduxjs/toolkit";

const initialState={email:localStorage.getItem("email") ,loggedIn:!!localStorage.getItem('token'),token:localStorage.getItem('token'),userId:localStorage.getItem('uID') };
 const AuthSlice= createSlice({
   name:'Auth',
   initialState,
   reducers:{
     
    
     IsLoggedIn(state,action){ 
          state.email=action.payload.email;  
          localStorage.setItem('email',action.payload.email)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
          state.token=action.payload.tkn;
          localStorage.setItem('token', action.payload.tkn);
          state.userId=action.payload.uid;
          localStorage.setItem('uID',action.payload.uid);
          state.loggedIn=true;
      },
     IsLoggedout(state,action){
        state.token=null;
        localStorage.clear('token');
        state.userId=null;
        localStorage.clear('uID');
        localStorage.clear("email");
        state.email=null;
        state.loggedIn=false;
      },
   }
});
 
export const  {IsLoggedIn,IsLoggedout}=AuthSlice.actions;
export default AuthSlice.reducer;