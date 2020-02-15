import React, { useState } from 'react';
import useForm from 'hooks/useForm';

const Register = () => {
    const { onSubmit, setForm, loading, error, ...formData } = useForm(initialState, 'register');

    return (
        <form className='form--separate' onSubmit={(e) => onSubmit(e)}>
            <p className='form__title'>Register</p>

            <label className='form__label'>Name:</label>
            <input 
                minLength='3'
                required
                className='input-main' 
                type="text" 
                name="username" 
                placeholder='name'
                value={formData.name} 
                onChange={e => setForm(e)} />
            {error.username && (<p className='form__error'>{error.username}</p>)}

            <label className='form__label'>Email:</label>
            <input 
                minLength='3'
                required
                className='input-main' 
                type="email" 
                name="email" 
                placeholder='email'
                value={formData.email} 
                onChange={e => setForm(e)} />
            {error.email && (<p className='form__error'>{error.email}</p>)}

            <label className='form__label'>Password:</label>
            <input 
                minLength='8'
                required
                className='input-main' 
                type="password" 
                name="password" 
                placeholder='password'
                value={formData.password} 
                onChange={e => setForm(e)} />
            {error.password_confirmation && (<p className='form__error'>{error.password_confirmation}</p>)}

            <label className='form__label'>Password confirm:</label>
            <input 
                minLength='8'
                required
                className='input-main' 
                type="password" 
                name="password_confirmation" 
                placeholder='confirm password'
                value={formData.passwordConfirmation} 
                onChange={e => setForm(e)} />

            <button
                className='button-main--submit m-t-2' 
                type="submit" >
                    { loading ?
                    <i className="fas fa-spinner loading__spin"></i>
                        :
                        'Sign Up'
                    }
            </button>
        </form>
     );
}

const initialState = {
    email: '',
    password: '',
    password_confirmation: '',
    username: '',
    error: {},
    loading: false,
};
 
export default Register;