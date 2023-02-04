import {useState} from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/Input'
import ViewHideButton from '../../../Buttons/View-Hide-Button/Button'

const ViewHideInput = ({id, name, placeholder, onChange, className} ) => {

    const [visible, setVisible] = useState(true);

    const togglePassword = (e) => {
        e.preventDefault();
        visible === true ? setVisible(false) : setVisible(true)
    }


  return (
    <div className = 'position-relative p-0'>
        
        <Input type = {visible ? "password" : "text"} id = {id} name = {name} placeholder = {placeholder} onChange = {onChange} />

        <ViewHideButton visible = {visible} onClick = {(e) => togglePassword(e)}/>

    </div>
  )
}

Input.defaultProps = {
    id: 'password',
    name: 'password',
    placeholder: 'Enter Password',
    className: 'w-100 p-1 m-0',
}

Input.propTypes = {
    id: PropTypes.string,
    name:  PropTypes.string,
    placeholder:  PropTypes.string,
    onChange:  PropTypes.func.isRequired,

}
export default ViewHideInput
