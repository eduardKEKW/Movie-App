import React, { useState } from 'react'
import useHttp from 'hooks/useHttp';
import Release from './Release';

const Releases = () => {
    const { loading, data, error } = useHttp('getTopReleases',null);
    const [releases, switchReleases] = useState(data);
    const loadingData = new Array(5).fill(0);
    const onClick = (i) => {
        if(!loading && data) {
            [data[2],data[i]] = [data[i], data[2]];
            switchReleases([...data]);
        }
    }

    return (
        <div className='releases'>
            
                {
                    loading || !data 
                    ?
                        loadingData.map((_,i) => (
                            <div key={i} className='releases__single--loading'>
                                <div className='loading'>
                                    <i className="fas fa-spinner loading__spin" ></i>
                                </div>
                            </div>
                        ))
                    :
                        data.map((data,i) => <Release data={data} onClick={onClick} index={i} key={i}/> )
                }
        </div>
    )
}

export default Releases