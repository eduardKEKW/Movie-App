import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import requests from 'Requests';

const useSuggestions = (params, methode = 'post', condition = true) => {
    const [ data, setData ] = useState(intialState);
    const firstRun = useRef(true);

    useEffect(() => {
        if(firstRun.current || !condition) {
            firstRun.current = false;
            setData(intialState);
            return undefined;
        };

        setData({...data, loading: true});
        const source = Axios.CancelToken.source();


        requests
            .getSuggestions({ name: params.name, cancelToken: source.token })
            .then((res) => {
                setData({
                    loading: false,
                    data: res,
                });
            })
            .catch((error) => {
                if(Axios.isCancel(error)) {
                    return;
                }
                setData({
                    loading: false,
                    error,
                });
            }); 

        return () => {
            source.cancel();
        };

    },[params,methode]);

    return data;
}
 
const intialState = {
    loading: false,
    error: false,
    data: null,
};

export default useSuggestions;