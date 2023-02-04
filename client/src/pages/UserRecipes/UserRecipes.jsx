import { useNavigate, useParams, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Recipe from '../../components/Recipe/Recipe'
import Button from '../../components/Buttons/Regular Button/Button'

import './UserRecipes.css'

const userRecipes = ({user, setUser}) => {

  // ---- NAVIGATION ----
  const navigate = useNavigate();
  const navigateToCreateRecipe = () => {
    navigate('/create_recipe');
  }

  // ---- PARAMS -----
  const params = useParams();
  const location = useLocation();


  // ----- STATE ----- 
  const [recipes, setRecipes] = useState([])



  // ---- USE EFFECT ----
  // Gets all Recipes from Database with user id and displays them
  useEffect(() => {
    try{
      const getRecipes = async (userName) => {
        const recipesFromServer = await fetchRecipes(userName)
        setRecipes(recipesFromServer)
      }
      getRecipes(params.userName)
    } catch(error) {
      console.log('User Recipe Error')
    }

  }, [params])

  // Fetch Recipes From Server
  const fetchRecipes = async (userName) => {
    const res = await fetch(`/api/profile/${userName}/recipes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }})

      const data = await res.json();      
      return data
  } 

  // Delete Recipe
  const deleteRecipe = async (id) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    })
      setRecipes(recipes.filter((recipe) => recipe._id !== id))
      console.log('Recipe Deleted')
    }

  if(recipes) {
    return (
      <div className = 'my-recipes-container'>
        
        <div className = 'row'>

          <div className = 'feed-title pt-5 pb-2 col'>
          { user.userName === params.userName ? <p className = 'fs-1'> My Recipes </p> : <p className = 'fs-1'> {params.userName}'s Recipes: </p>}
          </div>

          <div className = 'col d-flex align-items-center justify-content-end mt-4'>
              
              <Button 
                className = 
                'create-recipe-button btn-sm btn-outline-info'
                text = "Create a Recipe" 
                onClick = {navigateToCreateRecipe} 
                />

          </div>

        </div>

        <div className = 'grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3'>
            <>
              
              {recipes.map((recipe,index) => (
                  
                  <Recipe key = {recipe._id} recipe = {recipe} user = {user}setUser = {setUser} deleteRecipe = {deleteRecipe} />

              ))}

            </>
        </div>
              
      </div>
    )
  } else {
    return <div> No Recipes </div>
  }
  
}

export default userRecipes
