import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import Input from '../../components/Forms/components/Input/Input'
import Text_Area from '../../components/Forms/components/Text_Area/Text_Area'
import Button from '../../components/Buttons/Regular Button/Button'

import './CreateRecipe.css'

const CreateRecipe = ({user}) => {

  // ---- NAVIGAION ----
  const navigate = useNavigate();
  // ---- STATE ----htmlF  //Display flash messages for invalid form data
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  // State for Disabling Log in Button until all fields are filled out
  const [disabled, setDisable] = useState(true);
  // File
  const [imageFile, setFile] = useState(null);
  // Form Data
  const [imageData, setImageData] = useState(new FormData());
  const [formData, setFormData] = useState( {
    name: "",
    prepTime: { hours: 0, minutes: 0 },
    cookTime: { hours: 0, minutes: 0 },
    description: "",
    ingredients: "",
    directions: "",
  })

  const appendImage = async (e, file) => {
    e.preventDefault();
    imageData.append('file', file)
    console.log(imageData.get('file'))
    setFile(file);
  }

  // -----  ON FORM DATA CHANGE -------
  // on form input changem, edit state
  const editFormData = (e) => {

    e.preventDefault();
   
    const classList = e.target.className.split(' ');
    
    // Sets prep and cooktime values to '____ hr ____ min'
    if(classList.includes('prepTime') || classList.includes('cookTime') ) {

      const name = classList.includes('prepTime') ? 'prepTime' : 'cookTime';
      setFormData((prevState) => ({
        ...prevState,
        [name] : {
                ...prevState[name],
                [e.target.name] : e.target.value,
        }
      }))
      
    } else {
      // Used for other data
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value, 
      }))

    }

    console.log(formData)
  }


  // ----- USE EFFECT -------
  // Checks to see if both email and password are empty,
  // Disables button until each are filled out
  useEffect( () => {
    const checkInputs = () => {
      if(formData.name && formData.prepTime && formData.cookTime && formData.description && formData.ingredients && formData.directions && imageFile) {
        setDisable(false);
      } else
        setDisable(true);
    }

    checkInputs();
  }, [formData.name, formData.prepTime, formData.cookTime, formData.description, formData.ingredients, formData.directions, imageFile]); 

  // Redirects to login page if user is not currently logged in
  useEffect( () => {
    if(user === null) {
      navigate('/login')
      return;
    } 
  })
  
  // Post Recipe to server side for database storage
 
  const postRecipe = async (e) => {

    e.preventDefault();
    setShowMessage(false);
    setMessage('');

    imageData.append('formData', JSON.stringify(formData));
    for (const pair of imageData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    console.log(imageData.get('file'));
    // Posts recipe data to server, server checks for authentication,
    // returns status 
    const res = await fetch("/api/recipes", {
      method: 'POST',
      // headers: {
      //   'Content-type': "multipart/form-data"
      // },
      body: imageData
      // body: formData
    })
    
    // If Status is 200 (all green), upload recipe and navigate to recipes page
    if(res.status === 200) {
      const data = await res.json();
      console.log(data)
      navigate(`/profile/${user.userName}/recipes`);
      return;
    } 

    // If status is not 200, check error message and render it to the page
    const data = await res.json();
  
    setMessage(data.msg);
    setShowMessage(true);

  }
  const test = (e,formData) => {
    e.preventDefault();
    console.log(formData);
    console.log(imageData);
  }

  return (
  /* -------- RECIPE CONTAINER ----------- */
  <div className = 'create-recipe-container container card-containern mt-5'>
    <div className = 'row justify-content-center'>
      <div className = 'col-md-6'>
        {/* -------- RECIPE HEADER ----------- */}
        <div className = 'logo-container mt-5 mb-3'>
          <div className = 'title-div flex-vertical-center'>
            <h2 className = 'fs-3'> Enter a Recipe </h2>
          </div>
        </div>

        {/* Error Message */}
        { showMessage &&  
          <div>
            {message}
          </div>
        }

        <form className = 'recipe-form-container'>
          {/* Used for submitting purposes */}
          <button type="submit" disabled style={{display: "none"}} aria-hidden="true"></button>

          {/* RECIPE NAME */}
          <div className = "recipe-form recipe-name-form mb-4">
              <label htmlFor = 'name' className = 'form-label'> Recipe Name </label>
              <Input 
                className = 'form-control' 
                id = "name" 
                name = "name" 
                placeholder = "Enter Name" 
                onChange = {(e) => editFormData(e)}
              />
          </div>    
          {/* RECIPE PREP TIME */}
          <div className = "recipe-form recipe-prep-time-form mb-4">

            <label htmlFor = 'prepTime' className = 'form-label'> Prep Time </label>
            {/* prep hours */}
            <div className = 'row'>
              <div className = 'col-3'>
                <Input 
                  className = 'form-control prepTime' 
                  id = "prepTime-hours" 
                  name = "hours" 
                  placeholder = "Hr" 
                  onChange = {(e) => editFormData(e)}
                />
              </div>
             
              <label htmlFor = 'hours' className = 'form-label col-2 p-0 mt-2'> Hours </label>

              {/* prep minutes */}
              <div className = 'col-3'>
                <Input 
                  className = 'form-control prepTime' 
                  id = "prepTime-minutes" 
                  name = "minutes" 
                  placeholder = "Min" 
                  onChange = {(e) => editFormData(e)}
                />
              </div>

              <label htmlFor = 'minutes' className = 'form-label col-2 p-0 mt-2'> Minutes </label>

            </div> 
          </div>    
          {/* RECIPE COOK TIME */}
          <div className = "recipe-form recipe-cook-time-form mb-4">

            <label htmlFor = 'cookTime' className = 'form-label'> Cook Time </label>
            {/* cook hours */}
            <div className = 'row'>
              <div className = 'col-3'>
                <Input 
                  className = 'form-control cookTime' 
                  id = "cookTime-hours" 
                  name = "hours" 
                  placeholder = "Hr" 
                  onChange = {(e) => editFormData(e)}
                />
              </div>

              <label htmlFor = 'hours' className = 'form-label col-2 p-0 mt-2'> Hours </label>

            {/* cook minutes */}
              <div className = 'col-3'>
                <Input 
                  className = 'form-control cookTime' 
                  id = "cookTime-minutes" 
                  name = "minutes" 
                  placeholder = "Min" 
                  onChange = {(e) => editFormData(e)}
                />
              </div>

              <label htmlFor = 'minutes' className = 'form-label col mt-2 p-0'> Minutes </label>

            </div> 
          </div>    
          <div className = "recipe-form recipe-description-form mb-4">
            <label htmlFor = 'name' className = 'form-label'> Description </label>
              <Text_Area 
              className = 'form-control' 
              id = "description" 
              name = "description" 
              placeholder = "Enter Recipe Description" 
              onChange = {(e) => editFormData(e)}
            />
          </div>    
          <div className = "recipe-form recipe-ingredient-form mb-4">
            <label htmlFor = 'name' className = 'form-label'> Ingredients </label>
              <Text_Area 
              className = 'form-control' 
              id = "ingredients" 
              name = "ingredients" 
              placeholder = "Put each ingredient on its own line"
              onChange = {(e) => editFormData(e)}
              rows = '5'
            />
          </div>    
          <div className = "recipe-form recipe-directions-form mb-4">
          <label htmlFor = 'name' className = 'form-label'> Directions </label>
              <Text_Area
              className = 'form-control' 
              id = "directions" 
              name = "directions" 
              placeholder = "Put each step on its own line" 
              onChange = {(e) => editFormData(e)}
              rows = '5'
            />
          </div>    
          <div className = 'mb-4'>
            <label htmlFor="imgUpload" className="form-label">Image</label>
            <input type="file" className="form-control" id="imageUpload" name="file" onChange = {(e) => appendImage(e, e.target.files[0])}/>
          </div>

          {/* on submit, post recipe */}
          <Button className = 'submit-recipe-btn mb-3 btn-primary' type = "submit" text = "Submit Recipe"  disabled = {disabled} onClick = {(e) => postRecipe(e)}/>        
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreateRecipe


  {/* <div className = "recipe-form recipe-food-type-form">
          <Input id = "typeOfFood" name = "typeOfFood" placeholder = "Enter Type of Food" onChange = {onChange}/>
      </div>    
      <div className = "recipe-form recipe-location-of-origin-form">
          <Input id = "locationOfOrigin" name = "locationOfOrigin" placeholder = "Enter location of Origin" onChange = {onChange}/>
      </div>     */}