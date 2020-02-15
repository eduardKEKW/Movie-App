import React, { Fragment } from 'react'
import Loading from 'components/Loading';
import useRequest from 'hooks/useRequest';
import { useGlobal } from 'Providers';

const Header = ({ loading, movie }) => {
    const [{ user, loggedIn }, globalDispatch] = useGlobal();
    const [{ loading: addLoading }, addSendRequest] = useRequest('addToWatchList');
    const [{ loading: favLoading }, favSendRequest] = useRequest('addToFavorite');

    const addFav = () => {
        addSendRequest({ _id: movie._id}, (res) => globalDispatch({
            type: 'ADD_WATCHLIST',
            payload: { _id: movie._id }
        }));
    }

    const addWatch = () => {
        favSendRequest({ _id: movie._id }, (res) => globalDispatch({
            type: 'ADD_FAVORITE',
            payload: { _id: movie._id }
        }));
    }
    console.log(typeof movie.genres)
    return (
        <div className='movie-header'>
            <Loading loading={loading} >
                <h1 className='movie-header__title text__upper'>
                    {movie.title}
                </h1>
                
                <div className='movie-header__icons'>
                    <div className='movie-header__genres text__main'>
                        {movie.genres && movie.genres.join(' | ')}
                    </div>

                    <div className='movie-header__popularity'>
                        <i className="fas fa-sort-up">{movie.popularity}</i>
                    </div>
                    {
                            loggedIn
                        &&
                            <Fragment>
                                <div className='label'>
                                    <div className='label__content text__main'>Add to watchlist</div>
                                    <Loading loading={addLoading} >
                                        <i 
                                            className={`far fa-plus-square icon icon__add ${user.watchList.includes(movie._id) && 'yellow'}`}
                                            onClick={addFav}> </i>
                                    </Loading>
                                </div>
                        
                        
                                <div className='label'>
                                    <div className='label__content text__main'>Add to favorite</div>
                                    <Loading loading={favLoading} >
                                        <i 
                                            className={`far fa-star icon icon__add ${user.favoriteMovies.includes(movie._id) && 'yellow'}`} 
                                            onClick={addWatch}> </i>
                                    </Loading>
                                </div>
                            </Fragment>
                            
                    }
                </div>
            </Loading>
        </div>
    )
}

export default Header