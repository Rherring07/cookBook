import { useState} from 'react'
import PropTypes from 'prop-types'

import './Button.css'
import '../Regular Button/Button.css'

const Button = ({type, visible, onClick, className}) => {

  return (
    <button
        type = {type}
        className = 'btn btn-in btn-dark position-absolute h-100 top-0 end-0 pt-1' onClick = {onClick} >

          <p>{visible ? "View" : "Hide"} </p>

    </button>
  )
}

Button.defaultProps = {
    type: "button",
    className: 'btn btn-primary'
}


export default Button
