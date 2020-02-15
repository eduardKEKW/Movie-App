import React, { useState, useEffect, useCallback, useRef } from 'react';
import Axios from 'axios';
import requests from 'Requests';

const useRequest = (req) => {
    const mountedRef = useRef(true);
    const [data, setData] = useState(intialState);

    useEffect(() => {
        return () => mountedRef.current = false
    }, []);

    const sendRequest = useCallback((body, callback) => {
        setData({ ...data, loading: true });

        requests[req](body)
            .then((res) => {
                if(mountedRef.current){
                    setData({
                        loading: false,
                        data: res.data.data,
                    });
                    callback(res);
                }
            })
            .catch((error) => {
                if(mountedRef.current){
                    setData({
                        loading: false,
                        error,
                    });
                }
            });

    }, []);

    return [data, sendRequest];
}

const intialState = {
    loading: false,
    error: false,
    data: null,
};

export default useRequest;