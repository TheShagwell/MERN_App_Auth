import axios from "axios";
import {useState, useEffect} from 'react'

/*/ ************CONNECT TO THE BACKEND SERVER************ */
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN

// Custom hook
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoaing: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
      
        if(!query) return;

        const fetchData = async () => {
            try {
                setData(prev => ({...prev, isLoaing: true}));

                const { data, status } = await axios.get(`/api/${query}`);

                if(status === 200) {
                    setData(prev => ({...prev, isLoaing: false}));
                    setData(prev => ({...prev, apiData: data, status: status}))
                }
                setData(prev => ({...prev, isLoaing: false}));
            } catch (error) {
                setData(prev => ({...prev, isLoaing: false, serverError: error}))
            }
        };
        fetchData();

    }, [query]);

    return [getData, setData];

}