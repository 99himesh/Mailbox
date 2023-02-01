import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header=()=>{
    return (
        <Navbar>
        <Container  >
          <Nav  style={{margin:'0 auto' }}>
         <Link to="/signup"  style={{textDecoration:'none' ,padding:'0 10px'}}  >
              Signup
            </Link> 
           <Link to="/login" style={{textDecoration:'none',padding:'0 10px'}} >
              Login
            </Link>
            {/* <div className='float-end  text-end' style={{margin:'0 auto'}}>
                <button onClick={logOutHandler} style={{background:'rgb(160,82,45)',color:'white',border:'0',borderRadius:'5px'}} >logout</button>
             </div> */}
          
          </Nav>
        </Container>
      </Navbar>
    )

}

export default Header;