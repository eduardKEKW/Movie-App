import React, { useState, useEffect } from 'react'
import Filter from './Filter';
import useHttp from 'hooks/useHttp';
import Results from './Results';

const filters = ['Scarry', 'Funny', 'Suspense', 'Intrigue', 'Sad'];

const Search = () => {
    const [body, changeBody] = useState({ page: 0, perPage: 12, filters: filters });
    const { loading, data, error } = useHttp('getMovies',body);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if(data){
            setMovies([...movies, ...data]);
        }
    },[data]);

    const onFilterChange = (filters) => {
        setMovies([]);
        changeBody({ ...body, filters, page: 0 });
    }
    
    return (
        <div className='search'>
            <Filter filters={body.filters} onFilterChange={onFilterChange} />
            <div className='search__header text__upper'>
                Filter throw movies by scores.
             </div>
            <Results data={movies} changeBody={changeBody} loading={loading} page={body.page} />
        </div>
    )
}

export default Search
