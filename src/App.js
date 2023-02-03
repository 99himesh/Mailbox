import logo from './logo.svg';
import './App.css';
import React from 'react';
import SignUp from './component/pages/Signuppage/signup';
import LoginPage from './component/pages/Loginpage/login';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './component/Header/header';
import TextEditor from './component/texteditor/texteditor';
import InboxPage from './component/pages/inbox page/inbox';
import ComposeEmail from "./component/pages/compose Email/composeemail"
import InboxView from './component/pages/inbox page/inboxview';
import SentBox from './component/pages/sentbox/sentbox';
function App() {
 const ifLoggedIn= useSelector(state=>state.auth.loggedIn);

  return (
      <>
        <Header/>
       

        <Routes>
         {!ifLoggedIn && <Route path='/signup'   element={ <SignUp/>}></Route>}
       { !ifLoggedIn &&  <Route   path="*" element={<Navigate  to='/signup'/>}> </Route>}
        {!ifLoggedIn && <Route path='/login'   element={ <LoginPage/>}></Route>}
        {ifLoggedIn && <Route path="/inbox" element={<InboxPage/>}></Route>}
        {ifLoggedIn && <Route path="/sent" element={<SentBox/>}></Route>}
       {ifLoggedIn && <Route  path='/compose' element={<ComposeEmail/>}></Route>}
        {ifLoggedIn && <Route  path='/inbox/:key' element={<InboxView/>}></Route>}
         
        </Routes>
        
   
    


      </>
  );
}

export default App;
