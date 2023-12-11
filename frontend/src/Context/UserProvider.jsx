import React, {useEffect, useState} from 'react'
import UserContext from "./UserContext";

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
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            login(parsedUser);
        }
    }



    return(
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;