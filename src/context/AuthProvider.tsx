import { createContext, useState, } from "react";
import { getAuthenticatedUser } from "../utils/user";

interface IAuthenticatedUser {
    auth: IAuth | null;
    setAuth: any;
}

interface IAuth {
    email: string;
    id: number;
}

export const AuthContext = createContext<IAuthenticatedUser>({ auth: null, setAuth: null });

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<IAuth | null>(getAuthenticatedUser());

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );

};