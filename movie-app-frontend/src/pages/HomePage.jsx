import React from 'react'
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Releases  from "components/Releases";
import Separator from "components/Separator";
import Search from 'components/Search';
import Upcomings from 'components/Upcomings';

function HomePage() {
    const initialState = {};
    console.log('HOME')
    return (
        <div className='wrapper-home'>
            <Navigation />
            <Releases />
            <Separator name='Top Releases' />
            <div className='wrapper-home__aside'>
                <Search />
                <Upcomings />
            </div>
            <Footer />
            <Separator name={''} />
        </div>
    )
}

export default HomePage
