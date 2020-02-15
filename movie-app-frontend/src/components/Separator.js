import React from 'react'

const Separator = ({ name, Component = null, right = false }) => {
    return (
        <div className='separator'>
            {
                !right && <div className='separator__line'></div>
            }
            <div className='separator__name text__upper'>
            {
                Component ? <Component /> : name    
            }
            </div>
            <div className='separator__line--rigth'></div>
        </div>
    )
}

export default Separator
