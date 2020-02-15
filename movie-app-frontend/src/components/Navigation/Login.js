import React, {} from 'react';
import useForm from 'hooks/useForm';

const LogIn = () => {
    const { onSubmit, setForm, loading, error, ...formData } = useForm(initialState, 'login');
    
    return (
        <form className='form' onSubmit={(e) => onSubmit(e)}>
            <p className='form__title'>LogIn</p>

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

            <label className='form__label'>Password:</label>
            <input 
                minLength='8'
                required
                className='input-main' 
                type="password" 
                name="password" 
                placeholder='username'
                value={formData.password} 
                onChange={e => setForm(e)} />

            <button
                className='button-main--submit m-t-2' 
                type="submit" >
                    { loading ?
                        <i className="fas fa-spinner loading__spin"></i>
                        :
                        'Sign In'
                    }
            </button>

            { !!error &&
                 <div className='form__error'>{error.message}</div>
            }
        </form>
     );
}

const initialState = {
    email: '',
    password: '',
    error: {},
    loading: false,
};
 
export default LogIn;