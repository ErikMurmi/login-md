import Imagen from 'next/image'
import logo from '../img/acme_logo.png'
import styles from '../styles/Home.module.css'
import { useState,useEffect} from 'react'
import {auth, loginEmailPassword} from '../utils/Client'
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"
import { setUserCurrency } from './api/users'

export default function Home() {
  const firebaseUser = useUser()
  const router = useRouter()
  const [user,setUser] = useState(
  {
    username:"",
    password:"",
    currency:""
  })

  useEffect(() => {
    console.log('index ', firebaseUser)
    firebaseUser && router.replace("/home")
  }, [firebaseUser])

  const handleChange =(e)=>{
    const {value,name} = e.target
    setUser({...user,[name]:value})
  }

  const signIn=async(form)=>{
    form.preventDefault()
    console.log(user)
    if(user.currency===''){
      console.log('fake')
      alert("Campo no seleccionado","Debes seleccionar una moneda")
      return
    }
    const logged = await loginEmailPassword(user.username+'@user.com',user.password)
    console.log('Logged status: ',logged)
    if(logged===true){
      await setUserCurrency(auth.currentUser.uid,user.currency)
      router.replace('/home')
    }else{
        alert("Credenciales invalidas")
    }
    console.log(user)
  }

  return (
      <div className="form-container">
            <form className="login-form" onSubmit={signIn}>
                <h1>LOG IN</h1>
                <label htmlFor="username">Usuario</label>
                <input name="username" onChange={handleChange}/>
                <label htmlFor="password">Contraseña</label>
                <input name="password" type="password" onChange={handleChange}/>
                <label htmlFor="moneda">Moneda</label>
                <select name="currency" onChange={handleChange}> 
                    <option value="">Selecciona una opción</option>
                    <option value="ARS">ARS</option>
                    <option value="BRL">BRL</option>
                    <option value="CLP">CLP</option>
                    <option value="COP">COP</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
                <input type="submit" value="Log In"/>
            </form>
            <hr className='vertical-line'/>
            <Imagen src={logo} alt='logo_icon' width={300} height={300} priority/>
      </div>
  )
}
