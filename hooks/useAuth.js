import { useState, useEffect, useCallback } from "react";
import { parseCookies } from "nookies";
import { getCookie } from "cookies-next";
import axios from 'axios';
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const newUser = await axios.get('/api/verifyToken')
      setUser(newUser)
      console.log(newUser)
    } catch (error){
      if(error.response && error.response.status === '401'){
        console.log("No token found or invalid token")
      } else {
        console.log("An error occurred", error)
      }
    }

  };

  const removeUser = async () => {
    const cookies = parseCookies();
    const token = cookies.token;
    if(token){
      const maxAge = -1;
      document.cookie = `token=;max-age=${maxAge};path=/;`
    }
  }
  
  useEffect( () => {
    getUser()
  }, []);

  return { user, loading, getUser};
};

export default useAuth;
