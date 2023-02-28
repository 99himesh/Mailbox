import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sentMails } from "../../store/mailSlice";
import parse from "html-react-parser"

const SentView=()=>{
    const data=useSelector(state=>state.mail.sentMails);
    
    const param=useParams();
  
   
    
    const mail=data.filter((item)=> item.id===param.key)
    ////debugger
        console.log(mail);
    return (<div className="container py-5">
        <div className="row p-3" style={{width:"80%",margin:'0 auto',border:'2px solid blue'}}>
            <div>
                <h5>Form:-{mail[0].senderemail}</h5>
             </div>
            <div>
                <h6>TO:-{mail[0].recieveremail}</h6>
            </div>
            <div className="py-3">{mail[0].subject}</div>
            <div className="py-1">{parse(mail[0].body)}</div>
        </div>
        </div>
       )
}
export default SentView;