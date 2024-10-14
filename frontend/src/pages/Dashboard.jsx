import axios from "axios"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { useEffect, useState } from "react"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)
    const [use, setUse] = useState()
    useEffect(() => {
        const bal = async() => {
            const token = localStorage.getItem("token");    
            const baln = await axios.get("https://walletapi.kavishambani.in/api/v1/account/balance",{headers: {"Authorization" : `Bearer ${token}`}});
            setBalance(baln.data.balance);
        }
        const username = async() => {
            const token = localStorage.getItem("token");    
            const usr = await axios.get("https://walletapi.kavishambani.in/api/v1/user/username",{headers: {"Authorization" : `Bearer ${token}`}});
            setUse(usr.data.user)
        }
        bal()
        username()
    }, [])
    
    return(
        <div>
            <Appbar user={use}/>
            <div className="m-8">
            <Balance value={balance}/>
            <Users/>
            </div>
        </div>
    )
}