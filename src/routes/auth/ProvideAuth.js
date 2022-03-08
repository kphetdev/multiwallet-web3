import React, {useContext, createContext, useState} from 'react'

const fakeAuth = {
    isAuthenticated: false,
    login(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    logout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}
  

const authContext = createContext()

export const useProvideAuth = () => {

    const [user, setUser] = useState(null)

    const login = callback => {
        return fakeAuth.login(() => {
            setUser("user")
            callback()
        })
    }

    const logout = callback => {
        return fakeAuth.logout(() => {
            setUser(null)
            callback()
        })
    }

    return {
        user,
        login,
        logout
    }

}

export const ProvideAuth =  ({children}) => {

    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(authContext)
}
