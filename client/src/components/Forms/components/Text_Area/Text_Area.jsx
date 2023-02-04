import React from 'react'

const Text_Area = ({className, type, id, name, placeholder, onChange, rows}) => {

    return (
     <textarea
      className = {className}
      type = {type}
      id = {id}
      name = {name}
      placeholder = {placeholder} 
      onChange = {onChange}
      rows = {rows}/>
    )
  }
  
  Text_Area.defaultProps = {
    type: "text",
    placeholder: "",
  }
  
  
  
  
  export default Text_Area
  