import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginHeader from "../../Header/LoginHeder";
import Menu from "../sentbox/menu";
import { sentmail } from "../../store/mailSlice";
import { useState } from "react";
import { inboxemail, allmail } from "../../store/mailSlice";
import parse from "html-react-parser"
const InboxPage=(props)=>{
      const inboxdata=useSelector((state)=>state.mail.inboxMails);
      const [ifRead,setread]=useState(false);
      const AuthSlice=useSelector(state=>state.auth)
      const dispatch=useDispatch();
      debugger
      console.log(inboxdata);
       const list=inboxdata.map((item)=>{
      const deleteinboxMail=async()=>{
        try {
           
            const response = await fetch(`https://fir-log-in-f2be5-default-rtdb.firebaseio.com/himesh/${item.id}.json`, {
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



     const changeToRead = async (itm) => {
        console.log("read");
        try {
            const response = await fetch(`https://fir-log-in-f2be5-default-rtdb.firebaseio.com/himesh/${itm.id}.json`, {
                method: "PUT",
                body: JSON.stringify({
                    read: true,
                    recieveremail: itm.recieveremail,
                    subject: itm.subject,
                    body: itm.body,
                    senderemail: itm.senderemail

                }),
                header: {
                    "content-Type": "application/json",
                },
            })
            const transformedResponse = await response.json();
            if (response.ok) {
                console.log(transformedResponse.read);
                setread(true)
            }
            else {
                const errormessage = "Authentication failed";
                if (transformedResponse.error.message) {
                    errormessage = transformedResponse.error.message;
                }
            }
        } catch (err) {
            alert(err.message);
        }
        setread(false)

    }





            return(
                <div key={item.id} className="container-fluid px-0">
                    <div className="row bg-light py-2 mt-1 " >
                        <div className="d-flex" style={{justifyContent:'space-between'}}  >
                       <Link to={`/inbox/${item.id}`} onClick={changeToRead} style={{textDecoration:'none',alignItems:'center', color:"black"}}>
                        <div  className="d-flex "   >
                           { ifRead && <li style={{color:'blue'}}></li>}
                            <li style={{listStyle:'none',padding:'0 30px'}}>{item.subject}</li>
                            <li style={{listStyle:'none'}}>{parse(item.body)}</li>
                        </div>
                       </Link>
                            <button className="btn bg-danger" onClick={deleteinboxMail}><i className="fa fa-trash"></i></button>
                    </div>
                    </div>
   
               </div>
            )
       })



    


     return(
        <div className="container-fluid">
            <div className="row"><LoginHeader/></div>
            <div className="row">
                <div className="col-2"><Menu countinbox={props.countinbox}/></div>
                <div className="col-10">{list}</div>
            </div>
        </div>
     )


}
export default InboxPage;