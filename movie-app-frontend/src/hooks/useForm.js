import React, { useState } from 'react';
import { useGlobalDispatch } from 'Providers/GlobalProvider';
import requests from 'Requests';

const useForm = (initialState, type) => {
    const globalDispatch = useGlobalDispatch();
    const [{ loading, error, ...formData }, setFormData] = useState(initialState);
    const setForm = ({ target }) => {
            setFormData(state => (state[target.name] = target.value, { ...state }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(loading) return;
        setFormData(state => ({ ...state, loading: true }));

        requests[type](formData)
            .then(({ data = {} }) => {
                setFormData({ loading: false, error: false, ...formData });
                globalDispatch({ type: 'LOGIN', payload: { user: { ...data.data, token: data.token }} });
            })
            .catch(err => {
                const { data } = err.response || {};
                setFormData({ loading: false, error: data.errors || data  , ...formData });
            });
    }

    return {
        onSubmit,
        setForm,
        loading,
        error,
        ...formData,
    }
}

export default useForm;