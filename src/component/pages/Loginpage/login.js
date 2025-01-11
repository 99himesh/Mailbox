import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import  {IsLoggedIn,IsLoggedout} from "../../store/Authslice"



const LoginPage = () => {
     const dispatch=useDispatch();
    const navigate=useNavigate();
 const [error,seterror]=useState(false);
    const emailInputRef=useRef();
    const passwordinputref=useRef();
     
    const loginHandler=async(e)=>{
        e.preventDefault();
        const enterdemail=emailInputRef.current.value;
        const enteredpassword=passwordinputref.current.value;
        


        try { const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOBKsBkoQ9LTBCmp3LobdP7sg6C7JCzRM',{
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
         ////debugger
         console.log(transformedResponse);
         if(response.ok){
            const obj={email:transformedResponse.email,tkn:transformedResponse.idToken,uid:transformedResponse.localId
            }
            ////debugger
            dispatch(IsLoggedIn(obj))
            navigate("/inbox")
            console.log("logged in");

         }
        
         
         else{
            seterror(true);
            const errormessage="Authentication failed";
            if(transformedResponse.error.message){
                errormessage=transformedResponse.error.message;
            }
         }
        }catch(err){
            alert(err.message);
        }
    }
    const signUpChangeHandler=()=>{
        navigate("/signup") 
    }
 

    return (
        <div style={{height: `100vh`,overflow:"hidden", background: 'rebeccapurple'}}>
            <div className="container  text-center login" style={{ padding: '100px 0' , background: 'rebeccapurple'}}>
                <div className="row  w-100" style={{width:"20%",  margin: '0 auto', background: 'rebeccapurple' }}>
                    <h4 style={{ padding: '20px 0' }}>Login</h4>
                    {error && <p style={{color:'red'}}>please fill correct email and password</p>}
                    <form onSubmit={loginHandler}>
                        <div >
                            <input ref={emailInputRef} className=" px-3 py-2"  type="email" placeholder="Email"></input>
                        </div>
                        <div>
                            <input ref={passwordinputref} className="my-2 px-3 py-2" type="password" placeholder="Password"></input>
                        </div>

                        <div>
                            <button className="bg-warning  p-1" style={{ margin: '0 auto', border: '0', borderRadius: '5px',width:"220px" }}>Login</button>
                        </div>

                    </form>
                    <div>
                    <p onClick={signUpChangeHandler} style={{ color:"white",cursor:"pointer",  border: '0', margin: '20px 0' }}>Create account? Sign up</p>
                </div>
                </div>
             
            </div>
        </div>);






}
export default LoginPage;