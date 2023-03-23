import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

// To protect any user from going to the profile page
export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to='/' replace={true}></Navigate>
    }

    return children;
}

export const ProtectRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}