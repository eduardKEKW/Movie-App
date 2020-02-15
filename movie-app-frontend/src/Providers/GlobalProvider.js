import React, {createContext, useContext, useReducer, useEffect} from 'react';
import requests from 'Requests';
import { getStateFromStorage, removeToken, setLocalState, setToken } from 'helpers';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export const GlobalProvider = ({ children, initialState = {} }) => {
    const [globalState, globalDispatch] = useReducer(reducer, { ...defaultState, ...initialState });
    useEffect(() => { 
        getStateFromStorage(globalDispatch);
    } ,[]);

    return (
        <StateContext.Provider value={globalState}>
            <DispatchContext.Provider value={globalDispatch}>
                    {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const reducer = (state, { type, payload } = {}) => {
    switch(type) {
        case 'LOGIN':
                setToken(payload.user.token);
            return cache({ ...state, ...payload, loggedIn: true });
        case 'LOGOUT':
                removeToken();
            return cache({ ...defaultState });
        case 'ADD_WATCHLIST':
                var { _id } = payload;
                var { watchList } = state.user;

                if (watchList.includes(_id)){
                    watchList.splice(watchList.indexOf(_id), 1)
                } else {
                    watchList.push(_id);
                }
            return cache({ ...state });
        case 'ADD_FAVORITE':
                var { _id } = payload;
                var { favoriteMovies } = state.user;

                if (favoriteMovies.includes(_id)) {
                    favoriteMovies.splice(favoriteMovies.indexOf(_id), 1)
                } else {
                    favoriteMovies.push(_id);
                }
            return cache({ ...state });
        default: return state;
    }
}

const cache = (state) => {
    setLocalState(state);
    return state;
}

const defaultState = {
    loggedIn: false,
}

export const useGlobalState = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);
export const useGlobal = () => [useContext(StateContext),useContext(DispatchContext)];
