import requests from 'Requests';
import Axios from 'axios';

export const getStateFromStorage = async (dispatch) => {
    const state = JSON.parse(sessionStorage.getItem('state'));
    
    if(state) {
        if (state.user) {
            setToken(state.user.token);
            try {
                const { data } = await requests['getMe']();
                dispatch({ type: 'LOGIN', payload: { user: { ...data.data.user, token: data.data.token } } });   
            } catch (error) {
                dispatch({ type: 'LOGOUT' });
            }
        } else {
            dispatch({ type: 'RESET', payload: state });
        }
    }

    return undefined;
}

export const setLocalState = (state) => {
    sessionStorage.setItem('state',JSON.stringify(state));
}

export const removeToken = () => {
    Axios.defaults.headers.common['Authorization'] = null;
}

export const setToken = (token) => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getMovie = (name, dispatch) => {
    requests
        .getMovie(name)
        .then(({ data }) => {
            dispatch({ type: 'GET_MOVIE', payload: { ...data.data }});
        }).catch(err => {
            console.log(err.response);
            dispatch({ type: 'ERROR' });
        });
}

export const maxChars = (str,num) => {
    return str.length > num ? `${str.slice(0, num-3)}...` : str;
}