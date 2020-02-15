import React, { } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search.js';
import Form from './Form.js';
import { useGlobal } from 'Providers';
import Notifications from './Notifications';

const Navigation = () => {
    const [{ loggedIn }, globalDispatch] = useGlobal();

    return ( 
        <div className='nav'>
            <Link to={'/'}>
                <h1 className='nav__logo text__logo'>LOGO</h1>
            </Link>
            <Search />
            <div className='nav__icons'>
                 { loggedIn &&  <Notifications />}
                 { loggedIn ? <i className="fas fa-user nav__icon"></i> : <Form /> }
                 { loggedIn &&
                    <button className='button-main--logout' onClick={() => globalDispatch({ type: 'LOGOUT' })}>
                        Sign Out
                        <i className="fas fa-sign-out-alt m-l-1"></i>
                    </button>
                }
            </div>
        </div>
     ); 
}
 
export default Navigation;