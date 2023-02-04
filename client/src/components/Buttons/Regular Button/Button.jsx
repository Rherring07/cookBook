import PropTypes from "prop-types"

import "./Button.css"

const Button = ({className, type, text, disabled, onClick, onChange})  =>{
    return (
    <button 
            className = {`btn ${className} ${disabled ? 'btn-disabled' : 'btn'}`}
            type = {type}
            onClick = {onClick}
            onChange = {onChange}
            disabled = {disabled}
            >

                {text}

    </button>
    )
}

Button.defaultProps = {
    type: "button",
    disabled: false,
    className: 'btn-primary',
    onChange: () => {
        return;
    },
}



export default Button
