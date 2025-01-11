import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import JoditEditor from "jodit-react";
import TextEditor from "../../texteditor/texteditor";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {composeemail} from "../../store/mailSlice"
import { inboxemail, allmail } from "../../store/mailSlice";
import { sentmail } from "../../store/mailSlice";
import { useEffect } from "react";

const Menu=(props)=>{
    const AuthSlice=useSelector(state=>state.auth)
    // console.log(numberofmail);
const [status,setstatus]=useState(false); 
const [count,setcount]=useState(0);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    const navigate=useNavigate();

    const emailauth=  useSelector(state=>state.auth.email);
     const dispatch=useDispatch();
    const mailInputRef = useRef();
    const subjectInputRef = useRef();
    const bodyInputref= useRef();
   
    


        const submitHandler=async(e)=>{
        console.log("abcd");
        e.preventDefault();
         const enteredmail=mailInputRef.current.value;
         const enteredsubject=subjectInputRef.current.value;
         const enteredBody=bodyInputref.current.value;
 



         try { const response=await fetch('https://fir-log-in-f2be5-default-rtdb.firebaseio.com/himesh.json',{
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
                setstatus(true)
                mailInputRef.current.value="";
                subjectInputRef.current.value="";
                bodyInputref.current.value="";
                dispatch(composeemail({
                    mail:{read:false,
                        recieveremail: enteredmail,
                        subject:enteredsubject,
                        body:enteredBody,
                        senderemail:emailauth}

                      
              }));
             
             
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
const onChangee=()=>{
    setstatus(false);
}


console.log(props);

 

     return(
        <div className="container-fluid px-1">
            <div className="row">
            <Navbar bg="light" variant="light">
                        <Container style={{padding:'0 20px 400px 20px'}}>

                            <Nav className="me-auto d-inline"  >
                                <div>
                                    <div className="container-fluid" >   
                                        <div className="row" >
                                        <Button  style={{ borderRadius: '0', padding: '5px 20px'}}  variant="primary" onClick={handleShow}>
                                            compose
                                        </Button>

                                        <Modal show={show}  onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <Form  onSubmit={submitHandler} onChange={onChangee}>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                { status && <p className="text-center " style={{color:'green'}}>email sent successfully</p>}
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control
                                                   ref={mailInputRef}
                                                    type="email"
                                                    placeholder="Enter a email"
                                                    autoFocus
                                                />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>subject</Form.Label>
                                                <Form.Control
                                                    ref={subjectInputRef}
                                                    type="email"
                                                    placeholder="Enter a subject"
                                                    autoFocus
                                                />
                                                </Form.Group>
                                                <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                                >
                                                <Form.Label>text a message</Form.Label>
                                                <TextEditor bodyText={bodyInputref} />
                                                </Form.Group>
                                            </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" type="submit" onClick={submitHandler} >
                                            send mail 
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        </div> 
                                    </div>
                                </div>
                                <div className="py-2 px-3" >
                                    <Link to="/inbox"  style={{ textDecoration: 'none',color: 'black' }}>Inbox {props.countinbox} </Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="/sent" style={{ textDecoration: 'none', color: 'black' }}>sent{}</Link>
                                </div>
                            </Nav>
                        </Container>
            </Navbar>
        </div>

        </div>
     );
}
export default Menu;