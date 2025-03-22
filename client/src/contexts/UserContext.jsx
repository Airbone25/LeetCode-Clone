import { createContext,useEffect,useState } from "react"

export const UserContext = createContext()

export function UserContextProvider({children}){
    const [user,setUser] = useState()
    useEffect(()=>{
        const localUser = JSON.parse(localStorage.getItem('token'))
        if(localUser){
            setUser(localUser)
        }
    },[])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}