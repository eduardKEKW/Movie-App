import React from 'react';
import moment from 'moment';
import Loading from 'components/Loading';
import { Link } from "react-router-dom";

const Upcoming = ({ actors, title, popularity, released, loggedIn, loading, _id, addToWatchList, added, slug }) => {
    return (
            <div className='upcoming'>
                {loggedIn && !added
                    ?
                    <div className='upcoming__add'>
                        <Loading loading={loading} >
                            <div className='label'>
                                <div className='label__content text__main'>Add to watchlist</div>
                                <i className="far fa-plus-square" onClick={() => addToWatchList(_id)}></i>
                            </div>
                        </Loading>
                    </div>
                    : null
                }
                <Link to={`movie/${slug}`}>
                    <div className='upcoming__data'>
                        <p className='upcoming__title text__upper'>
                            {title}
                        </p>
                        <div className='upcoming__actors text__main'>
                            With {actors.map(({ name }) => (
                                <i className='upcoming__actor' key={name}>
                                    {name},
                        </i>
                            ))}
                        </div>
                        <div className='upcoming__time'>
                            Release {moment(new Date(released)).from(Date.now())} <i className=''>({moment(released).format("MMM Do YY")})</i>
                            <div className='upcoming__popularity'>
                                <i className="fas fa-sort-up">{popularity}</i>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
    )
}

export default React.memo(Upcoming)
