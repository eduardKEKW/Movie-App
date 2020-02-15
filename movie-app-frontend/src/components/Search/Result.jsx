import React from 'react'
import { maxChars } from 'helpers';
import { Link } from 'react-router-dom';

const Result = ({ data }) => {
    const { title, poster, ratings, slug } = data;

    return (
        <Link to={`movie/${slug}`}>
            <div className='result' key={title}>
                <img src={poster.replace(/300/g, '150')} alt={title} />

                <div className='text__upper result__title'>
                    {maxChars(title.slice(0, -7), 40)}
                </div>

                <div className='result__ratings'>
                    {
                        Object.keys(ratings).sort((a, b) => b.length - a.length).map(rating => (
                            <div className='result__rating text__upper' key={rating} >
                                {rating}: <i className='result__rating-score'>{ratings[rating].totalScore}</i>/10
                        </div>
                        ))
                    }
                </div>
            </div>
        </Link>
    )
}

export default React.memo(Result);
