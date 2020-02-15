import React, { } from 'react'
import { maxChars } from 'helpers';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Release({ data, onClick, index }) {
    const { released, awards, title, slug, poster } = data;

    return (
        <div key={slug} className='releases__single' onClick={() => onClick(index)}>
                {
                        index == 2
                    ?
                        <Link to={`movie/${slug}`}>
                            <img src={poster.replace(/300/g, '657')} />
                        </Link>
                    :
                        <img src={poster.replace(/300/g, '657')} />
                }

                <div className='text__main releases__single-about'>
                    <p className='text__upper'>{title}</p>
                    <p className='text__main'>{maxChars(awards, 200)}</p>
                    <p>{moment(new Date(released)).from(Date.now())}</p>
                </div>
        </div>
    )
}

export default Release;
