import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import SignUp from './component/pages/Signuppage/signup';
import LoginPage from './component/pages/Loginpage/login';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './component/Header/header';
import TextEditor from './component/texteditor/texteditor';
import InboxPage from './component/pages/inbox page/inbox';
import InboxView from './component/pages/inbox page/inboxview';
import SentBox from './component/pages/sentbox/sentbox';
import SentView from './component/pages/sentbox/sentView';
import LoginHeader from './component/Header/LoginHeder';
import AuthSlice from './component/store/Authslice';
import { allmail,inboxemail,sentmail } from './component/store/mailSlice';
import { useState } from 'react';
function App() {
    const [countinbox,setcountinbox]=useState(0);
  const AuthSlice=useSelector(state=>state.auth)
  const reduxallmail=useSelector(state=>state.mail.allMails)
  console.log(AuthSlice);
  const ifLoggedIn= useSelector(state=>state.auth.loggedIn);
  const dispatch=useDispatch();
   const getEmail = async () => {
    
  try {
      const response = await fetch('https://fir-log-in-f2be5-default-rtdb.firebaseio.com/himesh.json', {
          method: "GET",

          header: {
              "content-Type": "application/json",
          },
      })
      const transformedResponse = await response.json();
     
      
      if (response.ok) {
          let emailData = [];
          for (let key in transformedResponse) {
              emailData.push({ ...transformedResponse[key], id: key })
          }
          const allmails=emailData.filter(itm=>itm.senderemail===AuthSlice.email || itm.recieveremail==AuthSlice.email);
          const inboxdata=allmails.filter(itm=> itm.recieveremail==AuthSlice.email);
          const sentboxdata=allmails.filter(itm=>itm.senderemail===AuthSlice.email);
         //debugger
         console.log(allmails);
         console.log(inboxdata);
         console.log(sentboxdata);
         if(allmails.length==reduxallmail.length){
            console.log("no new mail");
            return;
         }
          let count=0;
          for(let i=0;i<inboxdata.length;i++){
              if (inboxdata[i].read === false) {
                  count=count+1;
              }
          }  
          setcountinbox(count)
          dispatch(allmail({allmails}))
          dispatch(inboxemail({inboxdata}))
          dispatch(sentmail({sentboxdata}))
      } else {
          const errormessage = "Authentication failed";
          if (transformedResponse.error.message) {
              errormessage = transformedResponse.error.message;
          }
      }
  } catch (err) {
      alert(err.message);
  }
}

useEffect(() => {
 const intervalid=setInterval(()=>{
    getEmail();
},5000)

return (()=>{
    clearInterval(intervalid)
})

})






  return (
      <>
        <Header/>
       

        <Routes>
       { !ifLoggedIn &&  <Route   path="*" element={<Navigate  to='/signup'/>}> </Route>}
       { ifLoggedIn &&  <Route   path="*" element={<Navigate  to='/sent'/>}> </Route>}
         {!ifLoggedIn && <Route path='/signup'   element={ <SignUp/>}></Route>}
        {!ifLoggedIn && <Route path='/login'   element={ <LoginPage/>}></Route>}
        {ifLoggedIn && <Route path="/inbox" element={<InboxPage countinbox={countinbox}/>}></Route>}
        {ifLoggedIn && <Route path="/sent" element={<SentBox countinbox={countinbox}/>}></Route>}
        {ifLoggedIn && <Route  path='/inbox/:key' element={<InboxView/>}></Route>}
        {ifLoggedIn && <Route  path='/sent/:key' element={<SentView />}></Route>}
        {ifLoggedIn && <Route  path='/login' element={<LoginHeader/>}></Route>}
         
        </Routes>
        
   
    


      </>
  );
}

export default App;
