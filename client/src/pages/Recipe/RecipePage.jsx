import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'
import Recipe from '../../components/Recipe/Recipe'

const RecipePage = ({user, setUser}) => {

  // ----- STATE -----

  // Recipe
   const [recipe, setRecipe] = useState([]);
  // Params
   const params = useParams();


  //  ---- USE EFFECT -----
  // Fetches Recipe using url id, stores in state
   useEffect(() => {
    const getRecipe = async (id) => {
      const recipeFromServer = await fetchRecipe(id)
      setRecipe(recipeFromServer)
    }

    getRecipe(params.id)
  }, [])
  

  // FETCH RECIPE
  const fetchRecipe = async (id) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }})

      const data = await res.json();
      return data
  } 
    

  if(recipe) {
    return (
      <div>
        
        <div className = 'recipe-header d-flex justify-content-center'> 
            <p className = 'fs-1 pt-5 pb-1'> {recipe.name} </p>
        </div>

        {/* Recipe Styled in Recipe Component */}
        <Recipe key = {recipe._id} recipe = {recipe} user = {user} setUser = {setUser}/>
           
      </div>
    )
  } else {
    return <div> Loading... </div>
  }

}

export default RecipePage
