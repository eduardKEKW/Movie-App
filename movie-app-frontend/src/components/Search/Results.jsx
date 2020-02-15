import React from 'react'
import Result from './Result';
import Separator from 'components/Separator';

const Results = ({ data, loading, changeBody, page }) => {

    return (
        <div className='results'>
            {
                    loading && !page
                ? 
                    <div className='results__data'>
                        <div className='loading'>
                            <i className="fas fa-spinner loading__spin m-t-10" ></i>
                        </div>
                    </div>
                :
                    <div className='results__data'>
                        {data.map(result => <Result data={result} key={result.title} />)}
                    </div>
            }

            <Separator Component={() => (
                <div className='results__more' onClick={() => changeBody(body => ({ ...body, page: body.page+1 }))} >
                    Show more
                    {
                            loading
                        ? 
                            <i className="fas fa-spinner loading__spin m-l-1"></i>
                        :
                            <i className="fas fa-sort-down results__more-icon"></i>
                    }
                </div>
            )} />
        </div>
    )
}

export default React.memo(Results);
