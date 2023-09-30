import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Recipe from '../../components/Recipe/Recipe'

import './Feed.css'

const Feed = ({user, setUser}) => {


  const [recipes, setRecipes] = useState([])

   // Gets all Recipes from Database and displays them
   useEffect(() => {
    const getRecipes = async () => {
      const recipesFromServer = await fetchRecipes()
      setRecipes(recipesFromServer.splice(0,30));
    }

    getRecipes()
  }, [])


  // Fetch Recipes From Server
  const fetchRecipes = async () => {
    const res = await fetch("/api/recipes", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }})

      const data = await res.json();
      console.log(data);
      return data
  } 


  if(recipes) {
    return (
      <div className = 'my-recipes-container '>

        {/* FEED HEADER */}
        <div className = 'feed-title pt-5 pb-2'> 
          <p className = 'fs-1'> Explore Recipes </p>
        </div>

        {/* FEED GRRID */}
        <div className = 'grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3'>

              {recipes.map((recipe,index) => (
                  // Recipes are styled in recipe component
                  <Recipe key = {recipe._id} recipe = {recipe} user = {user} setUser = {setUser}/>

              ))}

        </div>
        <div>
        </div>
  
      </div>
    )
  } else {
    return <div> No Recipes </div>
  }
}

export default Feed
