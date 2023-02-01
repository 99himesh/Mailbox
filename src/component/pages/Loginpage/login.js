import { useRef } from "react";
import {  useNavigate } from "react-router-dom";





const LoginPage = () => {
    const navigate=useNavigate();

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
         if(response.ok){
            navigate("/welcome")
            console.log("logged in");
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
    








    const signUpChangeHandler=()=>{
        navigate("/signup") 
    }
 

    return (
        <div>
            <div className="container  bg-light text-center" style={{ padding: '100px 0' }}>
                <div className="row  " style={{ width: '25%', margin: '0 auto', background: 'white' }}>
                    <h4 style={{ padding: '20px 0' }}>Login</h4>
                    {/* {error && <p>please fill all field</p>} */}
                    <form onSubmit={loginHandler}>
                        <div >
                            <input ref={emailInputRef} className="my-3 px-3 py-2" style={{ background: 'black', color: 'white', borderRadius: '20px', border: '0' }} type="email" placeholder="Email"></input>
                        </div>
                        <div>
                            <input ref={passwordinputref} className="my-3 px-3 py-2" style={{ background: 'black', borderRadius: '20px', color: 'white', border: '0' }} type="password" placeholder="Password"></input>
                        </div>

                        <div>
                            <button className="bg-primary  p-1" style={{ width: '80%', margin: '0 auto', border: '0', borderRadius: '20px' }}>Login</button>
                            <p className="py-1" style={{ color: 'blue', textDecoration: 'underline' }}>Forget Password</p>
                        </div>

                    </form>
                </div>
                <div>
                    <button onClick={signUpChangeHandler} style={{ background: 'skyblue', border: '0', padding: '10px 30px', margin: '20px 0' }}>Dont have an account? sign up</button>
                </div>
            </div>
        </div>);






}
export default LoginPage;