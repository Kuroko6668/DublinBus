//Some code taken and adapted from
//https://blog.devgenius.io/django-rest-framework-react-authentication-workflow-2022-part-2-d299b7fef875

import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {


  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/userManagement/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      // navigate.push("/");
      navigate("/")


    } else {
      alert("Incorrect password! Please try again");
    }
  };
  
  const registerUser = async (username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/userManagement/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2
      })
    });
    if (response.status === 201) {
      navigate("/SignIn");
    } else {
      alert("Oops! Please ensure your password is 8 characters long and is aplha-numeric. Try Again!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser, 
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};