import React from 'react'

const User = ({user}) => {
  return (
    <div>
      <p> {user.userName} </p>
      <p> {user.email} </p>
      <p> {user.password} </p>
      <p> {user._id} </p>
    </div>
  )
}

export default User
