import logo from './logo.svg';
import './App.css';
import React from 'react';
import SignUp from './component/pages/Signuppage/signup';
import LoginPage from './component/pages/Loginpage/login';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './component/Header/header';
import Welcome from './component/pages/welcome/welcome';
import TextEditor from './component/texteditor/texteditor';
import CompposeEmail from './component/pages/compose Email/composeemail';
// import TextEditor from './component/texteditor/texteditor';

function App() {
  // const ifLoggedIn=useSelector(state=>state.auth.loggedIn);

  return (
      <>
      
      <CompposeEmail/>
        {/* <Header/>
       

        <Routes>
         <Route path='/signup'   element={ <SignUp/>}></Route>
         <Route   path="*" element={<Navigate  to='/signup'/>}> </Route>
         <Route path='/login'   element={ <LoginPage/>}></Route>
         <Route path="/welcome" element={<Welcome/>}></Route>
          
        </Routes>
         */}

      </>
  );
}

export default App;
