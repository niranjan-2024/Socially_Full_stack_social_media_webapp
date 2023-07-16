import axios from 'axios';
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager';
import store from "../redux/store";
import { setLoading, showToast } from '../redux/slices/appConfigSlice';
import { TOAST_FAILURE } from '../App';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
})





axiosClient.interceptors.request.use(
    (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accessToken}`;

        store.dispatch(setLoading(true));
        return request;
    }
);

axiosClient.interceptors.response.use(
    
   async (response) => {

    store.dispatch(setLoading(false));

        const data = response.data;

        if(data.status === 'ok'){
            return data;
        }

        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;


        //refresh also expired so logout it and force to login again
        // if(statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`){
        //     removeItem(KEY_ACCESS_TOKEN);
        //     window.location.replace('/login','_self');
        //     return Promise.reject(error);
        // }

        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message:error
        }))

        if(statusCode === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const response = await axiosClient.get('/auth/refresh');

            // const response = await axios.create({
            //     withCredentials: true,
            // }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

            //console.log(response); 
            if(response.status === 'ok'){
                setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;

                return axios(originalRequest);
            }
            else{
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login','_self');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }, async(error) => {
        store.dispatch(setLoading(false));

        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error.message
        }))
    }
);