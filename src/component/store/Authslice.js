import { createSlice } from "@reduxjs/toolkit";

const initialState={loggedIn:!!localStorage.getItem('token'),token:localStorage.getItem('token'),userId:localStorage.getItem('uID') };
 const AuthSlice= createSlice({
   name:'Auth',
   initialState,
   reducers:{
    
     IsLoggedIn(state,action){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
          state.token=action.tkn;
          localStorage.setItem('token', action.payload.tkn);
          state.userId=action.uid;
          localStorage.setItem('uID',action.payload.uid);
          state.loggedIn=true;
      },
     IsLoggedout(state){
        state.token=null;
        localStorage.clear('token');
        state.userId=null;
        localStorage.clear('uID');
        state.loggedIn=false;
      },
   }
});
 
export const  AuthAction=AuthSlice.actions;
export default AuthSlice.reducer;