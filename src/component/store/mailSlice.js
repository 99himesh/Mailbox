import { createSlice } from "@reduxjs/toolkit";



 const MailSlice= createSlice({
   name:'mail',
   initialState:{allMails:[],sentMails:[],inboxMails:[]},
   reducers:{
    allmail(state,action){
        state.allMails=action.payload.allmails;
    },
    inboxemail(state,action){
     state.inboxMails=action.payload.inboxdata
    },
    sentmail(state,action){
    state.sentMails=action.payload.sentboxdata
    
    },

    composeemail(state,action){
       state.allMails.push(action.payload.mail);
       state.sentMails.push(action.payload.mail);
    },
    clearmailonlogout(state){
        state.allMails=[];
        state.sentMails=[];
        state.inboxMails=[];
    }
   }
});
 export const {allmail,inboxemail,sentmail,composeemail,countinbox,clearmailonlogout}=MailSlice.actions;
export default MailSlice.reducer;