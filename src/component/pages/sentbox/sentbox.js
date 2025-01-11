
import parse from "html-react-parser"

import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import LoginHeader from "../../Header/LoginHeder";
import { inboxemail, allmail } from "../../store/mailSlice";
import { sentmail } from "../../store/mailSlice";
import Menu from "./menu";

const SentBox = (props) => {
    const [unreadmessage, setmessagecount] = useState(0);
    const sentemailArray = useSelector(state => state.mail.sentMails);
    const AuthSlice=useSelector(state=>state.auth)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
 
    
    const list = sentemailArray.map((itm) => {
        const deleteHandler = async () => {
            try {
                //debugger
                console.log(itm.id);
                const response = await fetch(`https://fir-log-in-f2be5-default-rtdb.firebaseio.com/himesh/${itm.id}.json`, {
                    method: "DELETE",
                    header: {
                        "content-Type": "application/json",
                    },
                })
                const transformedResponse = await response.json();
                if (response.ok) {
                    console.log("data will be deleted");
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
        return (
            <div key={itm.id} className="container-fluid ">
                    <div className="row bg-light  px-0 py-2 mt-1 " >
                        <div className="d-flex" style={{justifyContent:'space-between'}} >
                       <Link to={`/sent/${itm.id}`} style={{textDecoration:'none',alignItems:'center', color:"black"}}>
                        <div className="d-flex "   >
                            <li style={{listStyle:'none' ,padding:'0 30px'   }}>{itm.subject}</li>
                            <li style={{listStyle:'none'}}>{parse(itm.body)}</li>
                        </div>
                       </Link>
                            <button className="btn bg-success" onClick={deleteHandler}><i className="fa fa-trash"></i></button>
                    </div>
                    </div>
   
               </div>
        )
    })
    return (
        <div className="container-fluid">
            <div className="row" >
               <LoginHeader/>
            </div>
            <div className="row ">
                <div className="col-4  col-md-1" >
                    <Menu countinbox={props.countinbox}/>
                </div>
                <div className="col-md-11 col-8 px-0">
                    <ul className="px-0">{list}</ul>
                </div>
            </div>
        </div>
    )
}
export default SentBox;