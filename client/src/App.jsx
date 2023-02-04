import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { useState, useEffect } from 'react'

import Header from "./partials/Header/Header"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Profile from './pages/Profile/Profile'
import SignUp from "./pages/SignUp/SignUp"
import Feed from "./pages/Feed/Feed"
import Recipe from "./pages/Recipe/RecipePage"
import Create_Recipe from "./pages/CreateRecipe/CreateRecipe"
import User_Recipes from "./pages/UserRecipes/UserRecipes"
import Bookmarked_Recipes from './pages/Bookmarked_Recipes/Bookmarked_Recipes'

// Bootstrap CSS
import '../src/styles.scss';
import 'bootstrap'

import "./App.css"


const App = () => {
  // Location

  // ---- IS LOGGED IN -----
  // -- Value to determine if user is logged in, passed around to children
  const [isLoggedIn, setLoggedIn] = useState( () => {
    return sessionStorage.getItem('currentUser') !== null;
  })


  // ---- USER DATA -----
  // -- Value for user data, passed around to children to edit
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  })

  // ---- Updates local storage with new user data whenever user data is changed inside child components
  useEffect( () => {
    if(user !== null) 
      sessionStorage.setItem('currentUser', JSON.stringify(user))
    
  }, [user])

  return (
    <div className = {`vh-100 ${isLoggedIn === false && 'w-80 m-auto'}`}>
        
        <Router>

          <Header title = "Recipe Uploader" isLoggedIn = {isLoggedIn} setLoggedIn = {setLoggedIn} user = {user} setUser = {setUser}/>


            <Routes>
                <Route path = "/" element = {<Home setUser = {setUser} setLoggedIn = {setLoggedIn}/>} />
                <Route path = "/signup" element = {<SignUp />} />
                <Route path = "/login" element = {<Login logIn = {setLoggedIn} setUser = {setUser} user = {user}/>} />
                <Route path = "/profile/:userName" element = {<Profile user = {user} setUser = {setUser}/>} />
                <Route path = "/feed" element = {<Feed user = {user} setUser = {setUser}/>} />
                <Route path = "/recipe" element = {<Recipe user = {user} setUser = {setUser}/>} />
                <Route path = "/create_recipe" element = {<Create_Recipe user = {user} setUser = {setUser}/> }/>
                <Route path = "/profile/:userName/recipes" element = {<User_Recipes user = {user} setUser = {setUser}/>} />
                <Route path = "/recipe/:id" element = {<Recipe user = {user} setUser = {setUser}/>} />
                <Route path = '/profile/:userName/bookmarked_recipes' element = {<Bookmarked_Recipes user = {user} setUser = {setUser}/>} />
            </Routes>

     

            
        </Router>
    

    
    
    </div>
  )
}

export default App
