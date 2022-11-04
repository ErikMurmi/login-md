import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,updateProfile,
     createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection,addDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY ,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);

export default app

export const loginEmailPassword = async(email,password)=>{
    const logged = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if (auth.currentUser.displayName===null){
            updateProfile(auth.currentUser,{
                displayName:user.email.replace("@user.com",'')
            }).then(()=>{
                console.log("Nombre actualizado")
            })
        }
        console.log(user.email)
        return true;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false
    });
    return logged;
}



export const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName,email, uid } = user

  return {
    email,
    displayName,
    uid
  }
}

export const onFirebaseAuthStateChanged = async (onChange) => {
  return await onAuthStateChanged(auth,(user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}
