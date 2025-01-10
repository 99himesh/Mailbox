import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IsLoggedIn,IsLoggedout } from "../store/Authslice";
import { clearmailonlogout } from "../store/mailSlice";
const LoginHeader=()=>{
    const ifLoggedIn= useSelector(state=>state.auth.loggedIn);
    const dispatch=useDispatch();
    const logOutHandler=()=>{
       dispatch(IsLoggedout())
       dispatch(clearmailonlogout())
    }  

    return (
        <div className="container-fluid ">
        <div className="row" >
              <nav className="navbar navbar-expand-lg bg-body-tertiary ">
              <div style={{display:'flex',justifyContent:'space-around' ,padding:"0 20px"}} className="collapse navbar-collapse" id="navbarSupportedContent">

                  {/* <div className="container-fluid "> */}
                      <a className="navbar-brand" href="#">yahoo!mail</a>
                          {/* <form style={{ width: '100%' }} className="d-flex" role="search">
                              <input style={{display:'flex',justifyContent:'center'}} className="form-control px-5 ms-5 me-2" type="search" placeholder="Search" />
                              <button className="btn btn-outline-success" type="submit">Search</button> */}
                              {ifLoggedIn && <div  style={{width:'100%',float:"right"}}>
                                      <button onClick={logOutHandler}   type="button" class="btn btn-outline-danger float-end">Log out</button>
                                        </div>}
          
                          {/* </form> */}
                          <div>
                        
                          {/* </div> */}

                      </div>
                  </div>
              </nav>
      </div>
      </div>
    );
}

export default LoginHeader;