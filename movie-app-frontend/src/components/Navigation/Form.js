import React, { Fragment, useState, useRef } from 'react';
import Login from './Login';
import Register from './Register';
import useModal from 'hooks/useModal';

const Form = () => {
    const node = useRef(null);
    const [open, toggleOpen] = useModal(node.current); 

    return (
        <div ref={node}>
            <p className='nav__text' onClick={() => toggleOpen(true)} >
                Register / <i className='yellow'>Log In</i>
            </p>
            {
                    open
                &&
                    (
                        <div className='modal'>
                            <h4 className='modal__title'>Create an account or register.</h4>
                            <div className='modal__forms'>
                                <Login />
                                <Register />
                            </div>
                        </div>
                    )
            }
        </div>
     );
}
 
export default Form;