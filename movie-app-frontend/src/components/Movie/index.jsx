import React, { useEffect } from 'react'
import About from './About';
import useRquest from 'hooks/useRequest';
import { useMovie, useGlobalState } from 'Providers';
import Actors from './Actors';

const Movie = () => {
    const [{ movie, loading }, movieDispatch] = useMovie();
    const [{ data }, fireReqeust] = useRquest('getMovieRatings');
    const { loggedIn } = useGlobalState();

    useEffect(() => {
        if (!loading && loggedIn){
            fireReqeust({ params: { movieId: movie._id } }, (res) => movieDispatch({
                type: 'GET_USER_RATINGS',
                payload: res.data.data,
            }));
        }
    }, [loading, loggedIn, movie]);

    return (
        <div className='wrapper-movie'>
            <About movie={movie} loading={loading} />
            <Actors movie={movie} loading={loading} />
        </div>
    )
}

export default Movie
