import React, {} from 'react';
import { maxChars } from 'helpers';
import { Link } from 'react-router-dom';

const Suggestions = ({ data, show, ref, setShow }) => {
    if(!show || !data) return null;
    const [ movies, users ] = data.map(({ data }) => data.data);

    return (
        <div className='suggest' ref={ref}>
            {
                movies.length ? 
                    movies.map(({ poster, title, genres, directors, popularity, slug }) => {
                        return (
                            <Link to={`/movie/${slug}`} key={slug} onClick={() => setShow(false)}>
                                <div className='suggest__single text__main'>
                                    <img src={poster} alt={title} className='suggest__img' />
                                    <div className='suggest__info '>
                                        <div className='suggest__title'>
                                            <div>{maxChars(title, 40)}</div>
                                            <div><i className="fas fa-sort-up suggest__popularity">{popularity}</i></div>
                                        </div>
                                        <div className='suggest__description text__main'>Directed by: {directors.join(', ')}</div>
                                        <div className='suggest__description text__main'>Genres: {genres.join(' | ')}</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                :
                <i className='suggest__none yellow'>No movies found.</i>
            }
                 
            {
                users.length ?
                    users.map(({username, avatar, types}) => {
                        return (
                            <a href='#' className='suggest__single--user text__main' key={username} >
                                <img src={avatar} alt={username} className='suggest__img--user' />
                                <div className='suggest__info text__main'> {maxChars(username,25)} </div>
                                <div className='suggest__types text__main'> {types.join(' | ')} </div>
                            </a>
                        );
                    })
                :
                <i className='suggest__none yellow'>No users found.</i>
            }
        </div>
     );
}
 
export default Suggestions;