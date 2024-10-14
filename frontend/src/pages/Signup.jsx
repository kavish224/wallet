import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Appbar from '../components/Appbar'
export const Signup = () => {
    const[firstname, setFirstname] = useState("");
    const[lastname, setLastname] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <>
            <Appbar/>
            <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="flex flex-col pt-12">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox onChange={(e)=>setFirstname(e.target.value)} placeholder={"Kavish"} label={"First Name"}/>
                    <InputBox onChange={(e)=>setLastname(e.target.value)} placeholder={"Ambani"} label={"Last Name"}/>
                    <InputBox onChange={(e)=>setUsername(e.target.value)} placeholder={"kavishkkambani@gmail.com"} label={"Email"}/>
                    <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder={"********"} label={"Password"}/>
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={async() => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                firstname,
                                lastname,
                                username,
                                password
                            })
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard")
                        }}/>
                    </div>
                    <BottomWarning label={"Already have an Account?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </div>
        </>
    )
}


