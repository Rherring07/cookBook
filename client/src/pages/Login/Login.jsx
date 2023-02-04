// ------------------------ IMPORTS ------------------------------------

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Input from "../../components/Forms/components/Input/Input"
import Button from "../../components/Buttons/Regular Button/Button"
import ViewHideInput from "../../components/Forms/components/Input-With-Toggle-Button/Input"

import './Login.css'

// --------------------------- LOGIN ----------------------------------


const Login = ({logIn, setUser, user}) => {

  // ---- NAVIGAION ----
  const navigate = useNavigate();
  
  // ---- STATE ----
  // State for disabling Log in Button until all fields are filled out
  const [disabled, setDisable] = useState(true);
  // State for displaying messages for invalid email or password
  const [message, setMessage] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  // Email and Password Values
  const[formData, setFormData] = useState( {
    email: '',
    password: '',
  })
  
  // Email and Password Value Update Functions
  const editFormData = (e) => {

    e.preventDefault();
    
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  // ----- USE EFFECT -------
  // Checks to see if both email and password are empty,
  // Disables button until each are filled out
  useEffect( () => {
    (formData.email && formData.password) ? setDisable(false) : setDisable(true)
  }, [formData.email, formData.password]); 

  

  // ---- LOG IN ------
  const login = async (e) => {
    e.preventDefault(); // Prevents page reloading

    // Resets message on screen
    setShowMessage(false);
    setMessage([]);

    // Posts login data to server, server checks for authentication,
    // returns status 
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    }) 

    // If Status is 200 (all green), login in and navigate to profile page
    if(res.status === 200) {
      const data = await res.json();
      setUser(data)   //Stores user in global user state
      sessionStorage.setItem('currentUser', JSON.stringify(data)); // Adds user to local storage
      logIn(true);    //Sets logged in status to true
      navigate(`/feed`);
      
      return;
    } 

    // If status is not 200, check error message and render it to the page
    const data = await res.json();
    setMessage(data); // Sets the message
    setShowMessage(true); // Shows the message
  }
  
  return (
    <div>
      {/* -------- LOG-IN CONTAINER ----------- */}
      <div className = 'row'>

          {/* -------- LOG-IN HEADER ----------- */}
          <div className = "login-header col-12 text-center flex justify-content-center">


               {/* Log In */}
            <div>
              <h2 className = 'fs-1 pt-5 pb-2 col'> Log In </h2>
            </div>
          
               {/* Error Message */}
              { showMessage &&  
                 <div className = 'text-danger py-3'>
                    {message.map((e) => (
                      <p> {e.msg} </p>
                    ))}
                </div>
              }
          </div>

          {/* -------- LOG-IN FORM ----------- */}
          <div className = "login-form-container d-flex justify-content-center">

            <div className = 'container col-lg-3  col-1'> </div>
            <form className = 'row flex-center' onSubmit = {(e) => login(e)}>

               {/* Email */}
              <div className = "row pb-2">
                
                <label htmlFor = 'email' className = 'py-2 fs-5 px-0'> Email Address </label>
                <Input className = 'p-1' type = "text" id = "email" name = "email" placeholder = "Enter Email" onChange = {(e) => editFormData(e)} />

              </div>

              {/* Password */}
              <div className = "row pb-2">

                <label htmlFor = 'password' className = 'py-2 fs-5 px-0'> Account Password </label>
                <ViewHideInput onChange = {(e) => editFormData(e)} />

              </div>


              {/* -------- LOG-IN BUTTON ----------- */}
              <div className = 'pt-3'>
                <Button className = "login-button btn-primary" type = 'submit' text = "Log In" disabled = {disabled} />
              </div>
            </form>

            <div className = 'container col-lg-3 col-1'> </div>
          </div>


      </div>

    </div>

  )
}

export default Login
