import React, { useState, useMemo, useEffect, useRef } from 'react';
import useSuggestions from 'hooks/useSuggestion';
import Suggestions from './Suggestions';
import useModal from 'hooks/useModal';
 
const Search = () => {
     const nodeRef = useRef(null);
     const [show, setShow] = useModal(nodeRef.current);
     const [ value, setValue ] = useState('');
     const requestParams = useMemo(() => ({ name: value }),[value]);
     const { loading, data, error } = useSuggestions(requestParams, 'get', value);

     return (
          <div className='nav__search' ref={nodeRef}>
               <input type="text" 
                      value={value}
                      className='input-nav'
                      onChange={({ target }) => setValue(target.value)}
                      onFocus={() => setShow(true)}
                      placeholder='Search' />
               {
                         loading 
                    ?
                         <i className="fas fa-spinner input-nav__search-icon--spin"></i>
                    :
                         <i className="fas fa-search input-nav__search-icon"></i> 
               }
               <Suggestions data={data} show={show} setShow={setShow} />
          </div>
     );
}

export default Search;