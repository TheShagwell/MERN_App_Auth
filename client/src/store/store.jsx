import { create } from 'zustand';

// This is a hook to be used in the client side
export const useAuthStore = create((set) => ({ 
    auth : {
        username : '',
        active : false
    }, 
    setUsername : ( name ) => set(state => ({ auth : {...state, username : name }}))
}))