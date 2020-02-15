import React, {createContext, useContext, useReducer, useEffect} from 'react';
import { getMovie } from 'helpers.js';
import { useParams } from 'react-router-dom';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export const MovieProvider = ({ children, initialState }) => {
    const [movieState, movieDispatch] = useReducer(reducer, { ...defaultState, ...initialState });
    const { slug } = useParams();

    useEffect(() => { 
        getMovie(slug, movieDispatch); 
    }, [slug]);

    return (
        <StateContext.Provider value={movieState}>
            <DispatchContext.Provider value={movieDispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const reducer = (state, { type, payload }) => {
    switch(type) {
        case 'GET_MOVIE':
            payload.user = { movie: {}, actors: {} };

            return { 
                ...state,
                loading: false,
                movie: payload,
            };
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: true,
            }
        case 'GET_USER_RATINGS':
            state.movie.user = payload;
        return { ...state };
        case 'RATE_MOVIE':
            const { movie = {} } = state.movie.user;

            movie[payload.key] = payload.value;
            
            return { ...state };
        case 'RATE_ACTOR':
            const { actors = {} } = state.movie.user;
            
            actors[payload.key] = payload.value;
            
            return { ...state };

        default: return state;
    }
}

const defaultState = {
    loading: true,
    movie: {},
    error: false,
}

export const useMovieState = () => useContext(StateContext);
export const useMovieDispatch = () => useContext(DispatchContext);
export const useMovie = () => [useContext(StateContext),useContext(DispatchContext)];