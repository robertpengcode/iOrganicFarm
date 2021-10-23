import { createContext } from "react";

export const AuthContext = createContext(
    {
        isSignedIn: false,
        signIn: ()=>{},
        signOut: ()=>{},
        username: "",
        userId: "",
        currentFarm: "",
        isAdmin: false,
        token: null,
    }

)