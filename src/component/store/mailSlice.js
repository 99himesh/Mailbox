import { createSlice } from "@reduxjs/toolkit";


const initialState={ mails:[ ]};
 const MailSlice= createSlice({
   name:'mail',
   initialState,
   reducers:{
    replacemailArray(state,action){
        state.mails=action.payload.newmailArray;

    }
    
    
    
   }
});
 
export const  MAilAction=MailSlice.actions;
export default MailSlice.reducer;