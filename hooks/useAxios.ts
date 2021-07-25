import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

const useAxios=(method: 'GET' | 'POST' | 'DELETE' | 'PUT',url:string,body:Record<string,any>,params:Record<string,any>)=>{
    const [response,setResponse]=useState<AxiosResponse>(null);
    const [error,setError]=useState<Error>(null);
    const [isLoading,setIsLoading]=useState<boolean>(true);
    const {accessToken} = useUser();
    let axiosClient:AxiosInstance=null;
    const authInterceptor = () => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        return (config: AxiosRequestConfig) => {
          config.headers[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return config;
        };
      };
    axiosClient = axios.create({
        baseURL: 'https://devbazar.herokuapp.com',
        headers: {
          "Content-Type": "application/json",
        }
      });
    useEffect(()=>{
      axiosClient.interceptors.request.use(authInterceptor());
    },[accessToken])


    useEffect(()=>{
      (async()=>{
        try {
            switch(method) {
                case 'GET':
                    let response=await axiosClient.get(url,{params})
                    setResponse(response);
                    setIsLoading(false);
                    break;
                case 'POST':
                    response=await axiosClient.post(url,body)
                    setResponse(response);
                    setIsLoading(false);
                    break;
                case 'PUT':
                    response = await axiosClient.put(url,body)
                    setResponse(response);
                    setIsLoading(false);
                    break;
                case 'DELETE':
                    response = await axiosClient.delete(url)
                    setResponse(response);
                    setIsLoading(false);
                    break;
                default:
                    break;
            }
        }catch (error) {
            setError(error);
            setIsLoading(false);
        }
    })()
    },[])

    return {response,error,isLoading}

}

export default useAxios;