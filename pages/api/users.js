import { async } from "@firebase/util";
import { collection, getDocs,addDoc,doc,getDoc, setDoc} from "firebase/firestore";
import { db } from "../../utils/Client"; 

const Collections ={
  USERS : 'users',
  BADGES:'badges'
}

export async function setUserCurrency(userid,currency){
  await setDoc(doc(db,"users",userid),{
    actualCurrency:currency
  },{merge:true})
}

export async function getUserData(userid){
  const data = await getDoc(doc(db,Collections.USERS,userid))
  console.log('hola,',data.data())
  return data.data()
}

export default async function handler(req,res){
  const {method,body} = req
  switch(method){
      case 'GET':
          const sol = await getAllUsers()
          return res.status(200).json(sol)
      case 'POST':
          console.log("body ",body)
          const result = await addDoc(collection(db, Collections.USERS),body)
          console.log(result)
          return res.status(200).json(result)
      default:
          return res.status(400).json({
              msg:'This method does not exits'
          })
  };
} 