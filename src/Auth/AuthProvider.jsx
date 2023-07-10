import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {  signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, uploadImageAndGetURL } from "../services/firebase";

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null);

    async function signin(email, password) {
        try{
            const res = await signInWithEmailAndPassword(auth,email, password)
        
            setUser(res.user)
        } catch(e) {
            switch(e.code){
                case "auth/wrong-password":
                    throw new Error("Senha errada!")
                    break
                case "auth/invalid-email":
                    throw new Error("Formato de email inválido!")
                    break
                case "auth/user-not-found":
                    throw new Error("Usuário não encontrado!")
                    break
            }
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    }, [])

    async function signup(email, password, avatar) {
    
        await createUserWithEmailAndPassword(auth, email, password).then(async (resp) => {
            
            const user = resp.user;

            await uploadImageAndGetURL(avatar, user).then(async url => {
                await updateProfile(user, {photoURL: url})
            })
            
        }).catch((e) => {
            switch(e.code){
                case "auth/weak-password":
                    throw new Error("Senha fraca, forneca ao minimo 6 caracteres!")
                    break
                case "auth/invalid-email":
                    throw new Error("Formato de email inválido!")
                    break
            }
        })

    }

    function signout() {
        if(confirm("deseja deslogar?")){
            auth.signOut()
            setUser(null)
        }
    }

    return(
        <AuthContext.Provider value={{user, signin, signout, signup}}>
            {children}
        </AuthContext.Provider>
    )

}