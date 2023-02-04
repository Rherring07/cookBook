import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Recipe from '../../components/Recipe/Recipe'
import Button from '../../components/Buttons/Regular Button/Button'

import Created_By from '../../components/Created_By/Created_By'

import './Bookmarked_Recipes.css'

const Bookmarked_Recipes = ({user, setUser}) => {

  // ----- STATE -----
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([])
  const params = useParams();

  // ----- USE EFFECT -----
  // Fetches user bookmarked recipes
  useEffect ( ()=> {
    const getBookmarkedRecipes = async () => {
      const recipesFromServer = await fetchBookmarkedRecipes();
      setBookmarkedRecipes(recipesFromServer);
    }
    getBookmarkedRecipes();
  }, [params]
  )


  // Fetch Recipes From Server
  const fetchBookmarkedRecipes = async () => {
    const res = await fetch(`/api/user_profile/bookmarked_recipes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }})

      const data = await res.json();      
      // console.log(data)
      return data
  } 

  if(bookmarkedRecipes.length > 0) {
    return (
      <div className = 'my-recipes-container'>

<div className = 'feed-title pt-5 pb-2'> 
          <p className = 'fs-1'> Bookmarked Recipes </p>
        </div>


        <div className = 'grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3'>
            <>

              {bookmarkedRecipes.map((recipe,index) => (
                <div className = 'recipe-container' key = {`${recipe._id}-container`}>
                  <Recipe key = {recipe._id} recipe = {recipe} user = {user} setUser = {setUser}/>
                </div>
              ))}

            </>
        </div>
              
      </div>
    )

  } else
    return <div> No Bookmarked Recipes </div>
   
}

export default Bookmarked_Recipes
