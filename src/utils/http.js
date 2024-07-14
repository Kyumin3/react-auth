import axios from "axios";
import { useDispatch } from "react-redux";
import { loadingAction } from "../store/actions/LoadingAction";
import { getToken, isTokenExpired } from "./token";

export const useAxios = () => {
    const dispatch = useDispatch();

    const baseURL = `${process.env.REACT_APP_API_URL}`;

    const instance = axios.create({
        baseURL: baseURL
    });
    
    instance.interceptors.request.use(
        (config) => {
            loadingAction.setIsLoading(dispatch, true);

            const accessToken = getToken();
            console.log("accessToken:::", accessToken);
    
            if ( accessToken ) {
                console.log( isTokenExpired(accessToken) );
                config.headers.Authorization = `Bearer ${accessToken}`
                console.log("config.headers.Authorization:::", config.headers.Authorization);
            }
            console.log("config:::", config);
            return config;
        },
        (error) => {
            console.log("error11:::", error);
            loadingAction.setIsLoading(dispatch, false);

            console.log(error);
            return Promise.reject(error);
        }
    );
    
    instance.interceptors.response.use(
        (response) => {
            console.log("response:::", response);
            loadingAction.setIsLoading(dispatch, false);

            if ( response.status === 404 ) {
                console.log('404 페이지로 넘어가야 함!');
            }
    
            return response;
        },
        async (error) => {
            console.log("error22:::", error);
            loadingAction.setIsLoading(dispatch, false);

            // console.log(error);
            if ( error.response?.status === 401 ) {
                // https://leeseong010.tistory.com/133
            }
            return Promise.reject(error);
        }
    );

    return {instance};
};