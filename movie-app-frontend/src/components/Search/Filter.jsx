import React, { useState, useRef } from 'react'

const Filter = ({ filters, onFilterChange }) => {

    const onClick = (i) => {
        if(!i){
            return undefined;
        }

        [filters[i], filters[i - 1]] = [filters[i - 1], filters[i]];
        onFilterChange([...filters]);
    }

    return (
        <div className='filters'>
             {
                filters.map((f,i) => (
                     <div className='filters__single' i={i} key={f}>
                        <div className='filters__name' onClick={(e) => onClick(i)}>
                            ({i+1}) {f}
                        </div>
                        <i className="fas fa-long-arrow-alt-left filters__arrow"></i>
                     </div>
                 ))
             }
        </div>
    )
}

export default Filter
