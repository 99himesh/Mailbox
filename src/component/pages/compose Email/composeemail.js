import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../texteditor/texteditor";

const ComposeEmail = (props) => {
     const emailauth=   useSelector(state=>state.auth.email);
    const mailInputRef = useRef();
    const subjectInputRef = useRef();
    const bodyInputref= useRef();
    const navigate=useNavigate();
   
    const gotoinbox=()=>{
        navigate("/inbox")
    }



 const submitHandler=async(e)=>{
    e.preventDefault();
     const enteredmail=mailInputRef.current.value;
     const enteredsubject=subjectInputRef.current.value;
     const enteredBody=bodyInputref.current.value;
     try { const response=await fetch('https://api-calls-fa398-default-rtdb.firebaseio.com/himesh.json',{
            method:"post",
            body:JSON.stringify({
                 read:false,
                 recieveremail: enteredmail,
                 subject:enteredsubject,
                 body:enteredBody,
                 senderemail:emailauth

            }),
            header: {
                "content-Type": "application/json",
              },   
         })
         const transformedResponse= await response.json();
         if(response.ok){
            console.log("data send successfull");
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

   
    return (
        <div className="container-fluid py-5">
            <div className="row">

                <form onSubmit={submitHandler}   >
                    <div>
                        <label className="px-5">To   :-</label>
                        <input ref={mailInputRef} placeholder="sent to mail"></input>
                        <hr />
                    </div>
                    <div>
                        <label className="px-4"> Subject  :-</label>
                        <input ref={subjectInputRef} placeholder="Subject"></input>
                        <hr />
                    </div>
                    <div>
                        <label className="px-5 py-3">Email  :-</label>
                        <TextEditor bodyText={bodyInputref} />
                    </div>
                    <div className="my-5">
                       <Button type="submit" >Send</Button>
                    </div>
                    <div className="my-5">
                       <Button onClick={gotoinbox} >Go To Inbox</Button>
                    </div>
               </form>

            </div>
        </div>
    )
}
export default ComposeEmail;