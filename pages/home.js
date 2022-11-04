import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { auth } from "../utils/Client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { getUserData } from "./api/users";

export default function Home(){
    const firebaseUser = useUser()
    const [userData,setUserData] = useState({username:"",currency:""})
    const router = useRouter()
    const signingOut = () => signOut(auth).then(router.replace('/'));

    useEffect(()=>{
        async function getUserInfo(){
            if(auth.currentUser!==null)
                setUserData(await getUserData(auth.currentUser.uid))
        }
        getUserInfo()
        console.log('firebase user, ',firebaseUser)
        console.log('auth user ', auth.currentUser)
       
        console.log('user data ', userData)
    },[])
    return(<>
        <div className="home_container">
        <h1>Bienvenido { auth.currentUser!==null?auth.currentUser.displayName:null}</h1>
        <p>Tu moneda actual es {userData.actualCurrency}</p>
        <button className="log_out" onClick={signingOut}>SALIR</button>
        </div>
        
    </>)
} 