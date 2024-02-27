import { useContext } from "react"
import { AuthContext } from "../context/auth-context";

export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw Error('useAuthContext can only be using inside AuthContext provider');
    }
    return context;
}