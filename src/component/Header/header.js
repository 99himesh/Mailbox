import { Container, Nav, Navbar } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Header=()=>{
 const ifLoggedIn= useSelector(state=>state.auth.loggedIn);

    return (
        // <Navbar>
        <Container  >
          <Nav  style={{margin:'0 auto' }}>
         {!ifLoggedIn && <Link to="/signup"  style={{textDecoration:'none' ,padding:'0 10px'}}  >
              Signup
            </Link> }
          {!ifLoggedIn && <Link to="/login" style={{textDecoration:'none',padding:'0 10px'}} >
              Login
            </Link>}
            
          
          </Nav>
        </Container>
      // </Navbar>
    )

}

export default Header;