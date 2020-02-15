import React from 'react'
import { MovieProvider } from 'Providers';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Separator from "components/Separator";
import Movie from 'components/Movie';

function MoviePage({ initialState }){
    console.log('MOVIE')
    return (
        <MovieProvider initialState={initialState}>
            <Navigation />
            <Movie />
            <Footer />
            <Separator name={''} />
        </MovieProvider>
    )
}

export default MoviePage;