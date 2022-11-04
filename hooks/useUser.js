import { useEffect, useState } from "react"
import { onFirebaseAuthStateChanged } from "../utils/Client"
import { useRouter } from "next/router"
import { connectStorageEmulator } from "firebase/storage"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    onFirebaseAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
