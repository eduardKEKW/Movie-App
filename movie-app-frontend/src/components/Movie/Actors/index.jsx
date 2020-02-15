import React from 'react'
import Separator from 'components/Separator';
import Loading from 'components/Loading';
import { useMovieDispatch } from 'Providers';
import { useGlobalState } from 'Providers';
import Rating from '../About/Rating';
import useRequest from 'hooks/useRequest';

const Actors = ({ movie, loading }) => {
    const [{ loading: reqLoading, error }, sendRequest] = useRequest('rateActor');
    const movieDispatch = useMovieDispatch();
    const { loggedIn } = useGlobalState();

    const rateActor = (_id, value) => {
        movieDispatch({
            type: 'RATE_ACTOR',
            payload: { key: _id, value: value }
        });
        sendRequest({ movieId: movie._id, actorId: _id, stars: value });
    }

    return (
        <div className='actors'>
            <Separator right={true} name='Actors' />
            <p className='text__upper m-b-1'>
                Rate an actor for its role in {movie.title}
            </p>    
            <Loading loading={loading} >
                {
                    movie.actors && movie.actors.map(actor => {
                        const { name, actor_ratings, avatar, _id } = actor;

                        return (
                            <Rating
                                actor={true}
                                key={name}
                                name={name}
                                score={actor_ratings}
                                avatar={avatar}
                                rate={(name,value) => rateActor(_id,value)}
                                userScore={movie.user.actors[_id]}
                                loggedIn={loggedIn} />
                        )
                    })
                }
            </Loading>
        </div>
    )
}

export default Actors
