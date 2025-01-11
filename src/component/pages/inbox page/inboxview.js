import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"

const InboxView=()=>{
const param=useParams();
console.log();
const mailsArray=useSelector(state=>state.mail.inboxMails);
const mail=mailsArray.filter((itm)=>itm?.id===param?.key)

    return (<div  className="container py-5">
        <div className="row p-3" style={{width:"80%",margin:'0 auto',border:'2px solid blue'}}>
            <div>
                <h5>Form:-{mail[0]?.senderemail}</h5>
             </div>
            <div>
                <h6>TO:- {mail[0].recieveremail}</h6>
            </div>
            <div className="py-3">{mail[0]?.subject}</div>
            <div className="py-1">{parse(mail[0]?.body)}</div>
        </div>
        </div>



       )

}
export default InboxView;