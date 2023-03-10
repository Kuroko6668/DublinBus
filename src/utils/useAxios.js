//code taken and adapted from
//https://blog.devgenius.io/django-rest-framework-react-authentication-workflow-2022-part-2-d299b7fef875

import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://34.242.44.49:8080/userManagement";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, setUserData } = useContext(AuthContext);

  // console.log('USE AXIOS')
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      // const userDataResponse = axiosInstance.get("/userdata/" + user.user_id);
      // setUserData(userDataResponse.data);
      // console.log('Axios user data')
      // console.log(userDataResponse.data)
      return req; 
    } 
    else {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });
  
      localStorage.setItem("authTokens", JSON.stringify(response.data));
  
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
    
      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    }


  });



  return axiosInstance;
};

export default useAxios;