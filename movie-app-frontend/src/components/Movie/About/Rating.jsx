import React, { useState, useEffect } from 'react'

const Rating = ({ name, score, loggedIn, userScore = 0, rate, actor=false, avatar }) => {
    const totalScore = score.totalVotes ? Math.floor(score.totalPoints / score.totalVotes) : 0;
    const [hoverState, setHoverState] = useState(totalScore);
    
    useEffect(() => {
        setHoverState(loggedIn ? userScore : totalScore);
    }, [userScore, loggedIn]);

    return (
        <div className={actor ? 'rating--actor' : 'rating'}>
            {
                    actor 
                &&
                    <img className='rating__avatar-img'src={avatar} alt={name} />
                   
            }
            <div className='rating__name text__upper t-m'>
                {name}
                <p className='rating__total text__main'>
                    <i className='yellow'>{totalScore}</i>/10 out of <i className='yellow'>{score.totalVotes}</i> votes.
                </p>
            </div>
            <div className='rating__stars'>
                {
                    new Array(10).fill(0).map((_,i) => {
                        const showLabel = loggedIn && (i + 1 == hoverState) && 'show';

                        return (
                            <div className='rating__label' key={i}>
                                <div className={`rating__label-content text__main ${showLabel}`}>
                                    Your rating ({i+1})
                                </div>
                                <i
                                    onMouseOver={() => loggedIn && setHoverState(i+1)}
                                    onMouseLeave={() => loggedIn && setHoverState(userScore)}
                                    onClick={() => loggedIn && rate(name, i+1)}
                                    className = {`fas fa-star rating__star ${i < hoverState && 'yellow'}`} >
                                </i>
                            </div>
                        )
                    })
                }
            </div>
            <div className='rating__score'>
                <i className='yellow t-s-3'>{hoverState}</i>
                <i className='t-s-1'> /10</i>
            </div>
        </div>
    )
}

export default React.memo(Rating);
