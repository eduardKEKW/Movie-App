import React from 'react'
import Rating from './Rating';
import Loading from 'components/Loading';
import { useMovieDispatch } from 'Providers';
import { useGlobalState } from 'Providers';
import useRequest from 'hooks/useRequest';

const Ratings = ({ movie, loading }) => {
    const [{ loading: reqLoading, error }, sendRequest] = useRequest('rateMovie');
    const movieDispatch = useMovieDispatch();
    const { loggedIn } = useGlobalState();

    const rateMovie = (key, value) => {
        movieDispatch({
            type: 'RATE_MOVIE',
            payload: { key, value }
        });
        sendRequest({ _id: movie._id, [key]: value });
    }

    return (
        <div className='ratings'>
            <Loading loading={loading} >
                {
                        movie.ratings 
                    &&
                        Object.keys(movie.ratings).sort((a,b) => b.length-a.length).map(key => {
                            return (
                                <Rating 
                                    name={key}
                                    score={movie.ratings[key]}
                                    key={key}
                                    rate={rateMovie}
                                    loggedIn={loggedIn}
                                    userScore={movie.user.movie[key]} />
                            )
                        })
                }

                <div className='text m-t-5'>
                    <p>{movie.plot}</p>
                    <p>{movie.awards}</p>
                </div>
            </Loading>
        </div>
    )
}

export default Ratings
