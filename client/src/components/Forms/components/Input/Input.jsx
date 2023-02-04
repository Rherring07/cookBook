import PropTypes from 'prop-types'
import './Input.css'

const Input = ({className, type, id, name, placeholder, onChange}) => {
  return (
   <input
    className = {className}
    type = {type}
    id = {id}
    name = {name}
    placeholder = {placeholder} 
    onChange = {onChange}/>
  )
}

Input.defaultProps = {
  type: "text",
  placeholder: "",
}




export default Input
