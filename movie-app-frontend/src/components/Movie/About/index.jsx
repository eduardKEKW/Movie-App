import React, { Fragment } from 'react'
import Poster from './Poster';
import Separator from 'components/Separator';
import Header from './Header';
import Ratings from './Ratings';

const About = ({ movie, loading }) => {
    return (
        <Fragment>
            <Header loading={loading} movie={movie} />
            <Separator right={true} name='Ratings' />
            <div className='flex-col'>
                <Poster movie={movie} laoding={loading} />
                <Ratings movie={movie} loading={loading} />
            </div>
        </Fragment>
    )
}

export default About
