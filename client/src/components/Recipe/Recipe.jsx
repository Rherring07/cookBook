import { useLocation, useNavigate } from 'react-router-dom'


import './Recipe.css'
import Button from '../../components/Buttons/Regular Button/Button'
import Created_By from '../Created_By/Created_By'

import { useState, useEffect } from 'react'

import heartUrl from './images/heart.svg'
import bookmarkUrl from './images/bookmarks.svg'

const Recipe = ({recipe, user, setUser, deleteRecipe}) => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const [likeVisibility, setLikeVisibility] = useState('hidden')
    const [bookmarkVisibility, setBookmarkVisibility] = useState('hidden')
    const [likes, setLikes] = useState(recipe.likes)

    const navigateToRecipe = () => {
        navigate(`/recipe/${recipe._id}`)
    }

 
    useEffect( () => {
    if(user.likedRecipes) {
        user.likedRecipes.some( id => id === recipe._id) && setLikeVisibility('');
    }

    if(user.bookmarkedRecipes) {
        user.bookmarkedRecipes.some(e => e._id === recipe._id) && setBookmarkVisibility('');
    }

    console.log(user)
    } , [] )


    const likeRecipe = async (id) => {
        const res = await fetch(`/api/user_profile/liked_recipes/${id}`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            }})
            
            const [userData, recipeData] = await res.json();
          
            setLikeVisibility('')
            setLikes(recipeData.likes);
            
            setUser(userData)
         
        }

    const unlikeRecipe = async (id) => {
        const res = await fetch(`/api/user_profile/liked_recipes/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json'
            }})
            
            const [userData, recipeData] = await res.json();

            setLikeVisibility('hidden')
            setLikes(recipeData.likes)
            setUser(userData)
    }

    const bookmarkRecipe = async (id) => {
        const res = await fetch(`/api/user_profile/bookmarked_recipes/${id}`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            }})
            
            const userData = await res.json();

            setBookmarkVisibility('')
            
            setUser(userData)
        }

    const unBookmarkRecipe = async (id) => {
        const res = await fetch(`/api/user_profile/bookmarked_recipes/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json'
            }})
            
            const userData = await res.json();

            setBookmarkVisibility('hidden')

            setUser(userData);
    }

    // RECIPE CARD - used on feed, my recuoes, bookmarked recipes
    if(location.pathname !== `/recipe/${recipe._id}`) 
    return (
        // RECIPE CONTAINER - adds bottom padding to space each row farther apart
        <div className = 'col pb-4'>
          {/* RECIPE CARD CONTAINER */}
          <div className = 'card h-100'>

            {/* Image  */}
            <img className="w-100 h-50" src = {recipe.image} alt = 'image'></img>
            {/* Card Body */}
            <div className = 'card-body'>

                {/* Card Title */}
                <div className = 'card-title mb-1'>
                    <h3> {recipe.name}</h3>
                    <p className = 'likes mb-0'><small><img src = {heartUrl} alt = 'heart'></img> <span>{likes}</span></small></p>
                </div>
                {/* Prep/Cook Time  */}
                {recipe.prepTime && // WHY DO I NEED THIS QWRQWRHUVSDFU recipe page will not load unless I have this
                <div className = 'mb-3'>
                    <p className = 'card-text m-0'>
                        <small className = 'text-muted'>
                        {/* Setting Prep Time */}
                        Prep Time:
                            {/* If Prep Time is set to 0 hr 0 min, or was omitted during recipe creation, say N/A */}
                            {recipe.prepTime.hours === 0 && recipe.prepTime.minutes === 0 ? ' N/A' : 
                                // Else, if recipe has no minute or hour input, don't show 0, ie '35min' instead of '0Hr 35Min'
                                ` ${recipe.prepTime.hours != 0 ? recipe.prepTime.hours + ' Hr' : ''} 
                                
                                ${recipe.prepTime.minutes != 0 ? recipe.prepTime.minutes + ' Min' : ''} `
                            }
                        </small>
                    </p>
                    <p className = 'card-text m-0'>
                        <small className = 'text-muted'>
                       {/* Setting Cook Time */}
                       Cook Time:
                            {/* If Prep Time is set to 0 hr 0 min, or was omitted during recipe creation, say N/A */}
                            {recipe.cookTime.hours === 0 && recipe.cookTime.minutes === 0 ? ' N/A' : 
                                // Else, if recipe has no minute or hour input, don't show 0, ie '35min' instead of '0Hr 35Min'
                                ` ${recipe.cookTime.hours != 0 ? recipe.cookTime.hours + ' Hr' : ''} 
                                
                                ${recipe.cookTime.minutes != 0 ? recipe.cookTime.minutes + ' Min' : ''} `
                        }
                        </small>
                    </p>
                </div>
                 }
                <div>
                    <p className = 'card-text text description'><small>{recipe.description}</small></p>
                </div>
            </div>

            <div className = 'row w-100 mx-0'>

            {/* If not on recipe page, show view recipe button */}
            {(location.pathname !== `/recipe/${recipe._id}`) &&
                <div className = "nav-button-div p-3 col-6">
                    <Button 
                    className = 'navigate-btn btn-outline-primary btn-sm' 
                    text = 'View Recipe' 
                    onClick = {navigateToRecipe}></Button>
                </div>
                }

            {(recipe.creator === user.userName && location.pathname === `/profile/${user.userName}/recipes`) 
                //  If User Recipe, and on My Recipes, show Delete Recipe Button
                ? <div className = "nav-button-div p-3 col-6 text-end">
                    <Button 
                        key = {`${recipe._id}-delete-button`} 
                        className = 'delete-recipe-button btn-outline-danger navigate-btn btn-sm' 
                        text = 'Delete Recipe'
                        onClick = {() => deleteRecipe(recipe._id)} 
                        />
                  </div>
                
                // if not user recipe, show footer with user information 
                : <div className = 'card-footer'>
                    <Created_By recipe = {recipe} /> 
                  </div>
            }

            </div>
            
            
          </div>
        </div>
    )


    // RECIPE PAGE
    return (
    <>

        {/* Prep/Cook Time */}
        {/* Setting Prep Time */}
        <div className = 'pb-4 d-flex justify-content-center'>
            <div className = 'flex-column'>
                <p className = 'text-muted m-0'>
                    Prep Time:
                        {/* If Prep Time is set to 0 hr 0 min, or was omitted during recipe creation, say N/A */}
                        {recipe.prepTime.hours === 0 && recipe.prepTime.minutes === 0 ? ' N/A' : 
                            // Else, if recipe has no minute or hour input, don't show 0, ie '35min' instead of '0Hr 35Min'
                            ` ${recipe.prepTime.hours != 0 ? recipe.prepTime.hours + ' Hr' : ''} 
                                        
                            ${recipe.prepTime.minutes != 0 ? recipe.prepTime.minutes + ' Min' : ''} `
                        }
                    {/* Setting Prep Time */}
                </p>
                <p className = 'text-muted m-0'>        
                Prep Time:
                    {/* If Prep Time is set to 0 hr 0 min, or was omitted during recipe creation, say N/A */}
                    {recipe.cookTime.hours === 0 && recipe.cookTime.minutes === 0 ? ' N/A' : 
                        // Else, if recipe has no minute or hour input, don't show 0, ie '35min' instead of '0Hr 35Min'
                        ` ${recipe.cookTime.hours != 0 ? recipe.cookTime.hours + ' Hr' : ''} 
                                    
                        ${recipe.cookTime.minutes != 0 ? recipe.cookTime.minutes + ' Min' : ''} `
                    }
                </p>
            </div>
        </div>

        {/* RECIPE GRID  */}
        <div className = 'row'>
            
            {/* LEFT SIDE */}
            <div className = 'container col-sm-1'></div>
            <div className = 'col-lg-5 col-md-8 col-sm-10 pb-5'>
                 {/* Image  */}
                <img className="w-100 h-80" src = {recipe.image} alt = 'image'></img>

                {/* Buttons container */}
                <div className = 'buttons row'> 

                    {/* Like Button + Likes */}
                    <div className = 'container likes-container col-9 row'>

                        {/* Like/Unlike Button */}
                        <div className = 'like-button-container col'>
                            <Button 
                                key = {`${recipe._id}-like-button`} 
                                className = 
                                    'like-recipe-button btn-primary col-12' 
                                text = 'Like' 
                                onClick = { () => likeRecipe(recipe._id) }
                            />
                            <div className = {`position-absolute col-12 top-0  ${likeVisibility} `}>
                                <Button 
                                    key = {`${recipe._id}-unlike-button`} 
                                    className = 
                                        {`unlike-recipe-button 
                                        btn-success 
                                        w-90`}  
                                    text = 'Liked' 
                                    onClick = { () => unlikeRecipe(recipe._id) }
                                    />
                            </div>
                        </div>

                        {/* Likes */}
                        <p className = 'likes mb-0 mt-1 col-7'><img src = {heartUrl} alt = 'heart'></img> <span>{likes}</span></p>
                     
                    </div>

                    {/* Bookmark Button */}
                    <div className = 'bookmark-button-container col'>
                        
                        <Button 
                            key = {`${recipe._id}-bookmark-button`} 
                            className = 
                                'bookmark-recipe-button btn-warning col-12' 
                            text = {<img src = {bookmarkUrl} alt = 'bookmark' />}
                            onClick = { () => bookmarkRecipe(recipe._id) }
                        />

                        <div className = {`position-absolute col-12 top-0  ${bookmarkVisibility}  `}>
                            <Button 
                                key = {`${recipe._id}-unBookmark-button`} 
                                className = 
                                {`unBookmark-recipe-button 
                                btn-success w-90`} 
                                text = {<img src = {bookmarkUrl} alt = 'bookmark' />}
                                onClick = { () => unBookmarkRecipe(recipe._id) }
                                />
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'container col-sm-1'></div>

            {/* RIGHT SIDE - Recipe Information */}
            <div className = 'col 6 m-auto grid col row-cols-2'> 

                {/* Ingredients */}
                <div className = 'pb-5'>
                    <p className = 'fs-2 text-decoration-underline'>Ingredients </p>
                    {/* For each ingredient, add a new line and a number */}
                    {recipe.ingredients.map( (item, index) => (
                        <p 
                        key = {`${recipe._id}-ingredient-${index}`} 
                        className = 'mb-1'>
                            {index+1}. {item}
                        </p>
                    ))}
                </div>
                
                {/* Directions */}
                <div className = 'pb-5'>
                    <p className = 'fs-2 text-decoration-underline'> Directions </p>

                     {/* For each step, add a new line and a number */}
                     {recipe.directions.map( (item, index) => (
                        <p 
                        key = {`${recipe._id}-step-${index}`} 
                        className = 'mb-2'>
                            {index+1}. {item}
                        </p>
                    ))}
                </div>
            </div>




        </div>
    </>

  )
}

export default Recipe

   {/* <div>
            <p> {recipe.typeOfFood}</p>
        </div>
        <div>
            <p> Recipe is from {recipe.countryOfOrigin}</p>
        </div> */}