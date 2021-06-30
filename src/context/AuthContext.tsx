import React, { useEffect, useState } from 'react';
import { createContext, ReactNode } from "react";

import {auth, firebase} from '../services/firebase';

type authContextData ={
    signInWithGoogle:() => Promise<void>;
    user: userProps | undefined;
    
}

export const AuthContext = createContext({} as authContextData);

type authProviderProps = {
    children: ReactNode;

}

type userProps={
    id:string;
    name:string;
    avatar:string;

}

export function AuthProvider({children}:authProviderProps){
    const [user, setUser] = useState<userProps | undefined>();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if(user){
                const {displayName, photoURL, uid} = user
                if (!displayName || !photoURL){
                    throw new Error('Missing information from Google Account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return()=>{unsubscribe();}
        
      },[])

    async function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        if(result.user){
            const {displayName, photoURL, uid} = result.user
            if (!displayName || !photoURL){
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }       
    }


return(
    <AuthContext.Provider value={{
        signInWithGoogle,
        user
       
    }}>
        {children}
    </AuthContext.Provider>
    )
}