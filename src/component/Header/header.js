import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthAction } from "../store/Authslice";


const Header=()=>{
 const ifLoggedIn= useSelector(state=>state.auth.loggedIn);

     const dispatch=useDispatch();
   const logOutHandler=()=>{
      dispatch(AuthAction.IsLoggedout())
   }



    return (
        <Navbar>
        <Container  >
          <Nav  style={{margin:'0 auto' }}>
         {!ifLoggedIn && <Link to="/signup"  style={{textDecoration:'none' ,padding:'0 10px'}}  >
              Signup
            </Link> }
          {!ifLoggedIn && <Link to="/login" style={{textDecoration:'none',padding:'0 10px'}} >
              Login
            </Link>}
            {ifLoggedIn && <div className='text-end' style={{width:'100%', margin:'0 auto'}}>
                <button onClick={logOutHandler}  style={{background:'rgb(160,82,45)',color:'white',border:'0',borderRadius:'5px'}} >logout</button>
             </div>}
          
          </Nav>
        </Container>
      </Navbar>
    )

}

export default Header;