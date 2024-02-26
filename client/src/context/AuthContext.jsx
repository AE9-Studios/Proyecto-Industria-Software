import { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie'

import { login, register, verify, logout } from '../api/auth.js'
import { set } from "react-hook-form";
import { Navigate } from "react-router-dom";


export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('UseAuth debería estar dentro del proveedor AuthContext');
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)  

    const signin = async (values) => {
        try {
            const res = await login(values)
            setUser(res.data)
            setIsAuthenticated(true)
            setErrors([])
            setLoading(false)
        } catch (error) {
            setErrors(error.response.data)
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
    }

    const signup = async (values) => {
        try {
            const res = await register(values)
            setUser(res.data)
            setIsAuthenticated(true)
            setErrors([])
            setLoading(false)
        } catch (error) {
            setErrors(error.response.data)
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
    }

    const logoutUser = async() => {
        try {
            const res = await logout()
            setUser(null)
            setIsAuthenticated(false)
            setErrors([])
            setLoading(false)
            return <Navigate to= '/home' replace/>            
        } catch (error) {
            setErrors(error.response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    const checkUser = async () => {
        try {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                setErrors([])   
                return setUser(null)
            }

            const res = await verify()

            if (!res.data){
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }
            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)

        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        checkUser()
    },[isAuthenticated])

    return <authContext.Provider value={{
        signin,
        signup,
        logoutUser,
        loading,
        user,
        isAuthenticated,
        errors,

    }}>
        {children}
    </authContext.Provider>;
}