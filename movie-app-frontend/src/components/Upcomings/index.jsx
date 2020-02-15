import React, { useState } from 'react';
import useHttp from 'hooks/useHttp';
import Upcoming from './Upcoming';
import requests from 'Requests';
import { useGlobal } from 'Providers';

const Upcomings = () => {
    const { data, loading, error } = useHttp('getUpcomings');
    const [{ loggedIn, user }, globalDispatch] = useGlobal();
    const [loadingAdd, setLoading] = useState(false);
    
    const addToWatchList = async (_id) => { 
        setLoading(true);

        requests['addToWatchList']({ _id })
            .then((res) => {
                globalDispatch({ type: 'ADD_WATCHLIST', payload: { _id } });
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }

    return (
        <div className='upcomings text__main'>
            {
                    loading || !data || error
                ?
                    <div className='loading'>
                        <i className="fas fa-spinner loading__spin" ></i>
                    </div>
                :
                    <div className=''>
                        <div className='text__upper'>Top upcoming movies</div>
                        {
                            data
                                .sort((a,b) => b.popularity-a.popularity)
                                .map(data => 
                                    <Upcoming 
                                        {...data}
                                        loggedIn={loggedIn}
                                        addToWatchList={addToWatchList}
                                        added = {user && user.watchList.includes(data._id)}
                                        loading={loadingAdd}
                                        key={data.title} 
                                    /> )
                        }
                    </div>
            }
        </div>
    )
}

export default Upcomings
