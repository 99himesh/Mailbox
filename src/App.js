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
function App() {

  return (
      <>
        <Header/>
       

        <Routes>
         <Route path='/signup'   element={ <SignUp/>}></Route>
         <Route   path="*" element={<Navigate  to='/signup'/>}> </Route>
         <Route path='/login'   element={ <LoginPage/>}></Route>
         <Route path="/inbox" element={<InboxPage/>}></Route>
         <Route  path='/compose' element={<ComposeEmail/>}></Route>
         <Route  path='/inbox/:key' element={<InboxView/>}></Route>
         
        </Routes>
        
   
    


      </>
  );
}

export default App;
