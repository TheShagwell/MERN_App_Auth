import axios from "axios";
import {useState, useEffect} from 'react';
import { getUsername } from "../helper/helper";

/*/ ************CONNECT TO THE BACKEND SERVER************ */
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN

// Custom hook
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoaing: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({...prev, isLoaing: true}));

                const { username } = !query ? await getUsername() : '';

                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

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