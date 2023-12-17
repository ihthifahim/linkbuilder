import React, {useEffect, useState} from 'react'
import UserContext from "./UserContext";


import { jwtDecode } from "jwt-decode";


const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserData()
    }, [])


    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        localStorage.clear()
        window.location.href="/login"
    }

    const getUserData = () => {
        try{
            const storedUser = localStorage.getItem('token');
            if (storedUser) {
                const decodedToken = jwtDecode(storedUser, '123');
                const parsedUser = {
                    userId: decodedToken.userId,
                    firstname: decodedToken.firstName,
                    lastname: decodedToken.lastName,
                    email: decodedToken.email
                }
                login(parsedUser);
            }
        } catch (error) {
            console.log("This is the error")
        }


    }



    return(
        <UserContext.Provider value={{user, login, logout, getUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;