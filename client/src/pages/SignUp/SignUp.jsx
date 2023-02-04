import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Input from "../../components/Forms/components/Input/Input"
import ViewHideInput from "../../components/Forms/components/Input-With-Toggle-Button/Input"
import Button from "../../components/Buttons/Regular Button/Button"

import './SignUp.css'


const SignUp = () => {

  // ---- NAVIGAION ----
  const navigate = useNavigate();


  // ---- STATE ----
  // State for button disable validation
  const [disabled, setDisable] = useState(true);
  // State for displaying messages for invalid email or password
  const [message, setMessage] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  // Form Data 
  const [formData, setFormData] = useState( {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
  })
  
  // on form input change, edit state
  const editFormData = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value, 
      }))
    }
    

  // ----- USE EFFECT -------
  //checks to see if inputs are empty, edits button
  useEffect( () => {
      const checkInputs = () => {
      if(formData.userName && formData.email && formData.password && formData.confirmPassword) {
          setDisable(false);
      } else
          setDisable(true);
      }

      checkInputs();
  }, [formData]); 

  // ----- CREATE ACCOUNT -------
  const createAccount = async (e) => {
      e.preventDefault();
      setShowMessage(false);
      setMessage([]);

      const res = await fetch('/api/signup', {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(formData)
      })

    // If Status is 200 (all green), navigate to login
    if(res.status === 200) {
      console.log("Form Submitted")
      const data = await res.json();
      console.log(data)
      navigate(`/login`);
      return;
    } 

    // If status is not 200, check error message and render it to the page
    if(res.status === 400) {
      const data = await res.json();
      setMessage(data);
      setShowMessage(true);
      return;
    }
  }

  return (

      <div className = "row">
        
        <div className = "login-header col-12 text-center flex justify-content-center">

          <div className = "signup-span-container">
            <h2 className = "fs-1 pt-5 pb-2"> Please Create an Account </h2>
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

        <div className = "signup-form-container d-flex justify-content-center">
          
          <div className = 'container col-lg-3  col-1'> </div>
          <form className = "row flex-center" onSubmit = {(e) => createAccount(e,formData)}>
              
            {/* Username */}
            <div className = "row pb-2"> 

                <label htmlFor = 'userName' className = 'py-2 fs-5 px-0'> Enter Username </label>
                <Input  type = "text" id = "userName" name = "userName" placeholder = "Enter Username" onChange = {(e) => editFormData(e)}/>
            
            </div>

            {/* Email */}
            <div className = "row pb-2">

                <label htmlFor = 'email' className = 'py-2 fs-5 px-0'> Email Address </label>
                <Input  type = "text" id = "email" name = "email" placeholder = "Enter Email" onChange = {(e) => editFormData(e)}/>

            </div>

            {/* Password */}
            <div className = "row pb-2">

                <label htmlFor = 'password' className = 'py-2 fs-5 px-0'> Account Password </label>
                <ViewHideInput id = "password" name = "password" placeholder = "Enter Password" onChange = {(e) => editFormData(e)}/>

            </div>
            {/* Password */}
            <div className = "row pb-2">

                <label htmlFor = 'password' className = 'py-2 fs-5 px-0'> Confirm Password </label>
                <ViewHideInput id = "confirmPassword" name = "confirmPassword" placeholder = "Confirm Password" onChange = {(e) => editFormData(e)}/>

            </div>

             {/* --------SIGNUP BUTTON ----------- */}
            <div className = "signup-button-container pt-3">

                <Button className = 'submit-btn btn-primary' type = "submit" text = "Click to Sign Up!" disabled = {disabled} />

            </div>

          </form>
          <div className = 'container col-lg-3  col-1'> </div>
          
        </div>


      </div>
    

  )

  }
export default SignUp
