import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import requests from 'Requests';

const useHttp = ( req, body = null) => {
    const [ data, setData ] = useState(intialState);

    useEffect(() => {
        setData({ ...data, loading: true });
        const source = Axios.CancelToken.source();

        requests[req]({ params: body, cancelToken: source.token })
            .then((res) => {
                setData({
                    loading: false,
                    data: res.data.data,
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

        return () => source.cancel();

    },[req, body]);

    return data;
}
 
const intialState = {
    loading: false,
    error: false,
    data: null,
};

export default useHttp;