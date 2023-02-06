
import { useNavigate } from "react-router-dom"

import About from "../../partials/About/About"
import Button from "../../components/Buttons/Regular Button/Button"

import Cookbook from './images/cookbook.jpg'

import "./Home.css"

const Home = ({setUser, setLoggedIn}) => {

    // ---- NAVIGATION -----
    const navigate = useNavigate();

    //signup button goes to signup page
        const NavigateToSignUp = () => {
        navigate('/signup')
    }
    

    // ---- STATE ----

    // Moved to Header component, keeping here for reference
    //Login button goes to login page
    // First checks to see if account is already logged in
    // redirects to current account page if logged in
    // const NavigateToLogin = async () => {
    //     const userData = await fetchUserData();
    //     if(userData) {
    //         setUser(userData)
    //         setLoggedIn(true)
    //         navigate(`/feed`)
    //     } else 
    //         navigate('/login')
    // }

    // Moved to Header component, keeping here for reference
    // const fetchUserData = async () => {
    //     const res = await fetch(`../api/user_profile`, {
    //         nmethod: 'GET',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     })
    //     if(res.status === 201)
    //         return null;

    //     const data = await res.json();
    //     return data;
    // }

    return (
        <div className = 'container  mt-5 pt-5 h-40 px-0'>  

            <div className = 'title-container row flex-lg-row-reverse align-items-center'>

                <div className="image title-image col-12 col-lg-6 col-md-10 h-100">
                    <div className="inner h-100">
                        <img className = 'w-100 h-100' src = {Cookbook} alt="" />
                    </div>
                </div>

                <div className = "col-lg-6 h-100 py-4">
                    <div>
                        <h1 className = 'fs-1 pb-3'> Breathing Life into Cooking through Collaboration</h1>
                        <About />   
                    </div>

                    <div className = "buttons">

                        <Button className = 'signup btn-primary' text = "Sign Up Now" onClick = {NavigateToSignUp} />

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Home
