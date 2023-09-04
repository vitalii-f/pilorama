/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState({
        login: '',
        email: '',
        permissionsLevel: null,
        permissionsName: ''
    })

    return (
    <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider