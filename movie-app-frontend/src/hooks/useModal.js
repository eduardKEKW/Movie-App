import React, { useState, useEffect } from 'react';

const useModal = (node,name= '111') => {
    const [open, toggleOpen] = useState(false);

    const onClick = ({ target }) => {
        if(node && !node.contains(target)){
            toggleOpen(false);
        }
    }

    const onEsc = (e) => {
        if(e.keyCode == 27){
            toggleOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onEsc, false);
        document.addEventListener('click', onClick,false);
        return () => {
            document.removeEventListener('click', onClick,false);
            document.removeEventListener('keydown', onEsc, false);
        }
    },[node]);

    return [open, toggleOpen];
}

export default useModal;