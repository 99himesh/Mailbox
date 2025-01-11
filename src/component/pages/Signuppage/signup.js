
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React,{useState,useRef} from "react";
import {Navigate, useNavigate} from 'react-router-dom'
const SignUp = () => {
    const [error,setError]=useState(false);
   
    const emailinputref=useRef("");
    const passwordinputref=useRef("");
    const confirmpasswordref=useRef("");
    const navigate=useNavigate();
     
const submitHandler= async(event)=>{
    event.preventDefault();
    const enterdemail=emailinputref.current.value;
    const enteredpassword=passwordinputref.current.value;
    const enteredconfirmpassword=confirmpasswordref.current.value;

    if(!enterdemail.includes('@') || enteredpassword!=enteredconfirmpassword || enteredpassword.length<6){
      setError(true);
      return ;
    }
    setError(false);
   try { const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOBKsBkoQ9LTBCmp3LobdP7sg6C7JCzRM',{
     method:"post",
     body:JSON.stringify({
          email:enterdemail,
          password:enteredpassword,
          returnSecureToken:true          
         
     }),
     header: {
         "content-Type": "application/json",
       },   
  })
  const transformedResponse= await response.json();
  if(response.ok){
    navigate("/login")
console.log("User has successfully signed up");
  }else{
     const errormessage="Authentication failed";
     if(transformedResponse.error.message){
         errormessage=transformedResponse.error.message;
     }
  }
 }catch(err){
     alert(err.message);
 }
}

const logInHandler=()=>{
   navigate('/login')
} 
    return (<div  style={{height: `100vh`,overflow:"hidden", background: 'rebeccapurple'}}>
        <div className="container-fluid  text-center" style={{ padding: '100px 0' }}>
            <div className="row  w-100 " style={{ width: '25%', margin: '0 auto' }}>
              <div className="col-md-12">
                <h4 className="py-3">Sign up</h4>
                 {error && <p style={{color:'red'}}>Signup Failed</p>}
                 {!error && <p style={{color:'green'}}>SuccessFull Signup</p>}

                <form onSubmit={submitHandler}>
                    <div>
                        <input className="px-3 py-2" ref={emailinputref} type="text" placeholder="Email"/>
                    </div>
                    <div>
                        <input className= " my-2 px-3 py-2" ref={passwordinputref} type="password" placeholder="password"  />
                    </div>
                    <div>
                        <input className="px-3 py-2" ref={confirmpasswordref} type="passsword" placeholder="confirm password"  />
                    </div>
                    <div>
                        <button className="bg-warning my-4 p-1" style={{width:"220px", borderRadius: '5px', border: '0' }}>Sign up</button>
                    </div>
                    <div>
                <p onClick={logInHandler} className="" style={{ color:"white",cursor:"pointer",  border: '0', margin: '5px 0' }}>Have an account? Login</p>
            </div>
                </form>
             
            </div>
            </div>
            
       
        </div>
    </div>)
}
export default SignUp;