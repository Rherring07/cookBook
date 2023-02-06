import { useNavigate, useLocation, Link } from "react-router-dom"
import Button from "../../components/Buttons/Regular Button/Button"
import { Container, Navbar, Nav, NavDropdown, NavbarBrand } from "react-bootstrap";

import Logo from './images/logo.svg'

import "./Header.css"

const Header = ({title, isLoggedIn, setLoggedIn, user, setUser}) => {

  const location = useLocation();
  
  // ----- NAVIGATION -----
  const navigate = useNavigate();  

  //Login button goes to login page
  // First checks to see if account is already logged in
  // redirects to current account page if logged in

  const NavigateToLogin = async () => {
    const userData = await fetchUser();
    if(userData) {
        setUser(userData)
        setLoggedIn(true)
        navigate(`/feed`)
        console.log(userData)
    } else 
        navigate('/login')
  }

  // Used for Login
  const fetchUser = async () => {
    const res = await fetch(`../api/user_profile`, {
        nmethod: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    if(res.status === 201)
        return null;

    const data = await res.json();
    return data;
  }

  
  // Signup
  const NavigateToSignup = () => {
    navigate('/signup')
  }

  // ----- LOGOUT -----
  const Logout = async () => {
    // Fetch Logout function from server
    const res = await fetch(`/api/logout`, {
      method: 'GET'
    })

    const data = res.json(); 
    setUser(null); // Removes stored User State
    setLoggedIn(false); // Updates Logged In State
    // Remove user from local storage
    if(sessionStorage.getItem('currentUser') !== null)
      sessionStorage.removeItem('currentUser')
    
    navigate('/login'); // Navigate to login page
  }

  return (
    // {/* HEADER CONTAINER */}
    <div className = 'header-container py-3 header static-top bg-white row col-lg-10 col-md-11 col-12-sm m-auto'>
    <Navbar className = 'h-100' collapseOnSelect expand="md" variant="light">

      
        {/* WEBSITE LOGO  */}
        {/* Links to user profile */}
        <div className = 'h-6r'>
          <Navbar.Brand> 
            <Link className = "navbar-brand d-flex align-items-center h-100" 
                  to = {isLoggedIn ? '/feed' : '/'}> <img className = 'w-80 h-80' src = {Logo} alt = 'logo'></img>
            </Link>
          </Navbar.Brand>
        </div>


        {/* If logged in, show buttons */}
        { isLoggedIn && 
          <>
            <Navbar.Toggle className = 'ms-auto' aria-controls="responsive-navbar-nav" />
             {/* navbar-toggle */}
            <Navbar.Collapse id="responsive-navbar-nav">
        
              {/* NAVBAR */}
              <Nav className = 'ms-auto'>
            
                {/* CREATE_RECIPE */}
                <Nav.Link eventKey = '1'
                  className = {`nav-link ${location.pathname !== '/create_recipe' && 'link-primary'}`}
                  as = {Link}
                  to = "/create_recipe"
                >
                  Create Recipe
                </Nav.Link>

                {/* MY_RECIPES */}
                <Nav.Link eventKey = '2'
                  className = {`nav-link ${location.pathname !== `profile/${user.userName}/recipes` && 'link-primary'}`}
                  as = {Link}
                  to = {{pathname: `profile/${user.userName}/recipes`}}
                >
                  My Recipes
                </Nav.Link>

                {/* BOOKMARKED RECIPES */}
                <Nav.Link eventKey = '3'
                  className = {`nav-link ${location.pathname !== `profile/${user.userName}/bookmarked_recipes` && 'link-primary'}`}
                  as = {Link}
                  to = {{pathname: `profile/${user.userName}/bookmarked_recipes`}}
                >
                  Bookmarked Recipes
                </Nav.Link>

                {/* FEED */}
                <Nav.Link eventKey = '4'
                  className = {`nav-link ${location.pathname !== '/feed' && 'link-primary'}`}
                  as = {Link}
                  to = '/feed'
                >
                  My Feed
                </Nav.Link>
            


                {/* LOGOUT BUTTON */}
                <Button eventKey = '6' className = 'btn-dark' text = "Logout" onClick = {Logout} />

              </Nav>

            </Navbar.Collapse>
          </>
        } 
      
        { (isLoggedIn === false) &&
          <div className = 'ms-auto'>
          {/* LOGIN BUTTON */}
          <Button eventKey = '5' className = 'btn-outline-secondary me-3'  text = "Login" onClick = {NavigateToLogin}/>
           {/* SIGNUP BUTTON */}
           <Button eventKey = '5' className = 'btn-primary'  text = "Sign up" onClick = {NavigateToSignup} />
          </div>
        }
    
    </Navbar>
    </div>
  )
}

export default Header

