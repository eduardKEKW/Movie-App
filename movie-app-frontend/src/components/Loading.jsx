import React, { Fragment } from 'react'

const Loading = ({ children, loading }) => {
    return (
        <Fragment>
            {
                    loading
                ?
                    <div className='loading'>
                        <i className="fas fa-spinner loading__spin"></i>
                    </div>
                :
                    children
            }
        </Fragment>
    )
}

export default Loading
