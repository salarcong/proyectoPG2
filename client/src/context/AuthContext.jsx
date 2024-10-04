import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const signup = async (user) => {
       try {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
       } catch (error) {
        console.log(error.response);
        setErrors(error.response.data);
       }
    }

    const signin = async (user) => {
        try {
          const res = await loginRequest(user);
          if (res && res.data) {
            setIsAuthenticated(true);
            setUser(res.data);
            if (res.data.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/tasks');
            }
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          console.log(error);
          if (error.response && error.response.data) {
            setErrors([error.response.data.message]);
          } else {
            setErrors(['An unexpected error occurred']);
          }
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookie = Cookies.get();

                if (!cookie.token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return setUser(null);

                }
                
                    try {
                        const res = await verifyTokenRequest(cookie.token)
                        if (!res.status) {
                            setIsAuthenticated(false);
                            setLoading(false);
                            return;  
                        } 

                        setIsAuthenticated(true);
                        setUser(res.data);
                        setLoading(false);

                    } catch (error) {
                        setIsAuthenticated(false);
                        setUser(null);
                        setLoading(false);
                    }
                }
                checkLogin();
            
            }, []); 

    return( 
    <AuthContext.Provider 
        value={{
            signup,
            signin,
            logout,
            loading,
            user, 
            isAuthenticated,
            errors,
    }}>
        {children}
    </AuthContext.Provider>
   )};