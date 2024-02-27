import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextReducer = (state, action)=>{
    switch (action.type){
        case 'LOGIN':
            return {user : action.payload};
        case 'LOGOUT':
            return {user : null};
        default:
            return state;
    }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthContextReducer, {
        user:null,
    })
    useEffect(()=>{
        const checkUserLogin = async ()=>{
            try{
                const token = localStorage.getItem('jwt');
                
                if(!token){
                    // dispatch({type: "LOGIN", payload:})
                    return;
                }
                
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/check-user/${token}`);
                const data = await response.json();
                
                if(response.ok){
                    console.log("Logged-in Successfuly from auth context", data)
                    dispatch({type:'LOGIN', payload:data.user});
                }
            }
            catch(err){
                console.log(err);
            }
        }
        checkUserLogin();
    },[])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}