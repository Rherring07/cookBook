import React from 'react'
import Button from '../Buttons/Regular Button/Button'
import { useNavigate, Link } from 'react-router-dom'

import './Created_By.css'


const Created_By = ({recipe}) => {

const navigate = useNavigate();

// Navigate to creator profile
  const navigateToProfile = (id) => {
  navigate(`/profile/${id}/recipes`)
}

  return (
    <div className = 'creator card-text'>
      <small className = 'text-muted'>Created By: <Link to = {{pathname:  `/profile/${recipe.creator}/recipes`}}> {recipe.creator}</Link></small>

    </div>
  )
}

export default Created_By
