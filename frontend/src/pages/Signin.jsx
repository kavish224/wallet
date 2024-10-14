import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Appbar from '../components/Appbar'
export const Signin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            <Appbar/>
            <div className="min-h-screen flex justify-center bg-gray-100">
                <div className="flex flex-col pt-40">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading label={"Sign in"} />
                        <SubHeading label={"Enter your information to sign in"} />
                        <InputBox placeholder={"kavishkkambani@gmail.com"} label={"Email"} onChange={(e) => setUser(e.target.value)} />
                        <InputBox placeholder={"********"} label={"Password"} onChange={(e) => setPassword(e.target.value)} />
                        <div className="pt-4">
                            <Button label={"Sign in"} onClick={async () => {
                                const response = await axios.post("https://walletapi.kavishambani.in/api/v1/user/signin", {
                                    username: user,
                                    password
                                })
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard")
                            }} />
                        </div>
                        <BottomWarning label={"New to wallet? "} buttonText={"Sign up"} to={"/Signup"} />
                    </div>
                </div>
            </div>
        </>
    )
}
