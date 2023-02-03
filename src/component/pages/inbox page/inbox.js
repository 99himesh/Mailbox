
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { MAilAction } from "../../store/mailSlice";



const InboxPage = () => {
       const emailArray=useSelector(state=>state.mail.mails);
    const navigate = useNavigate();
    // const [emailArray, setEmailArray] = useState([]);
    const dispatch=useDispatch();
    const pagechangetocompose = () => {
        navigate("/compose")
    }
 
   


    const getEmail = async (e) => {
        try {
            const response = await fetch('https://api-calls-fa398-default-rtdb.firebaseio.com/himesh.json', {
                method: "GET",

                header: {
                    "content-Type": "application/json",
                },
            })
            const transformedResponse = await response.json();
            if (response.ok) {
                const emailData = [];
                for (let key in transformedResponse) {
                    emailData.push({...transformedResponse[key],id:key})
                }
                // setEmailArray(emailData);
                dispatch(MAilAction.replacemailArray({newmailArray:emailData}))
                console.log(emailData);
                console.log(transformedResponse);
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

    setInterval( useEffect(()=>{
        getEmail();
    }),2000)
   

const changeToRead=async(itm)=>{
    try { const response=await fetch(`https://api-calls-fa398-default-rtdb.firebaseio.com/himesh/${itm.id}.json`,{
        method:"put",
        body:JSON.stringify({
            read:true,
            recieveremail: itm.recieveremail,
            subject:itm.subject,
            body:itm.body,
            senderemail:"demo@gmail.com"

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


    const list = emailArray.map((itm) => {
      const  deleteHandler=async()=>{
        try { const response=await fetch(`https://api-calls-fa398-default-rtdb.firebaseio.com/himesh/${itm.id}.json`,{
            method:"DELETE",
        //     body:JSON.stringify({
        //         read:true,
        //         recieveremail: itm.recieveremail,
        //         subject:itm.subject,
        //         body:itm.body,
        //         senderemail:"demo@gmail.com"
    
        //    }),
            header: {
                "content-Type": "application/json",
              },   
         })
         const transformedResponse= await response.json();
         if(response.ok){
            console.log("data will be deleted");
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

            <div className="container my-1 bg-light" >
                <div className="row">  
                 <NavLink onClick={changeToRead.bind(null,itm)} to={`/inbox/${itm.id}`}> 
                 <li style={{ listStyle: 'none',display:'flex' }} >
                        {!itm.read && <div  style={{width:'5px',height:'5px',borderRadius:'50%',margin:'10px 5px', background:'blue'}}></div>}
                        <div className="pe-5">{itm.subject}</div>
                        <div className="px-5" >{itm.body}</div>
                 </li>
                 </NavLink>
                 <div className="text-end py-1"  > <Button onClick={deleteHandler} > Delete</Button></div>
                </div>
            </div>

        )
    })


    return (
        <div className="container-fluid" >
            <div className="row" >
                <nav className="navbar navbar-expand-lg bg-body-tertiary ">
                    <div className="container-fluid px-5">
                        <a className="navbar-brand" href="#">yahoo!mail</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form style={{ width: '80%' }} className="d-flex" role="search">
                                <input className="form-control px-5 ms-5" type="search" placeholder="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>

            </div>
            <div className="row">
                <div className="col-2 " >
                    <Navbar bg="light" variant="light">
                        <Container>

                            <Nav className="me-auto d-inline"  >
                                <div>
                                    <Button onClick={pagechangetocompose} style={{ borderRadius: '0', padding: '5px 50px' }} >compose</Button>
                                </div>
                                <div className="py-2 px-3" >
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>Inbox</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sent</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>
                                <div className="py-2 px-3">
                                    <Link to="" style={{ textDecoration: 'none', color: 'black' }}>sample</Link>
                                </div>

                            </Nav>
                        </Container>
                    </Navbar>
                </div>

                <div className="col-10">
                    <Button onClick={getEmail}>GetData</Button>
                    <ul>{list}</ul>
                </div>

            </div>
        </div>

    )






}

export default InboxPage;