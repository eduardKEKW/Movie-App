import React, { Fragment, useState, useRef } from 'react';
import useModal from 'hooks/useModal';
import useHttp from 'hooks/useHttp';

const Notification = () => {
    const node = useRef(null);
    const [seen, setSeen] = useState(false);
    const { loading, error, data } = useHttp('getNotifications',null);
    const [open, toggleOpen] = useModal(node.current);

    return (    
        <div className='notification' ref={node}>
            {data && !seen && <p className='notification__count'>{data.length}</p>}
            <i className="fas fa-bell nav__icon" onClick={() => { toggleOpen(true); setSeen(true); }}></i>
            {
                open
                    &&
                (
                    <div className='notification__modal'>
                        {
                                loading || !data
                            ?
                                <div className='loading'>
                                    <i className="fas fa-spinner loading__spin"></i>
                                </div>
                            :
                                data.map(({ message, from, seen },i) => {
                                    return (
                                        <div className='notification__single' key={i}>
                                            <i className={`fas fa-circle ${seen ? "grey" : "yellow"} notification__seen`}></i>
                                            <div className='notification__text'>
                                                <p className='notification__message'>{message}</p>
                                                <p className='notification__from'>From: {from}</p>
                                            </div>
                                        </div>
                                    );
                                })
                                
                        }
                    </div>
                )
            }
        </div>
     );
}
 
export default Notification;