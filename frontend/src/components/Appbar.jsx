import {React, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileDrop } from './ProfileDrop';
import Button from './Button';

function Appbar({user}) {
    const navigate = useNavigate();
    const[p, setP] = useState("K")
    useEffect(() => {
        if (user) {
            setP(user[0].toUpperCase());
        }
    }, [user]);
    return (
        <>
            <div className="shadow h-16 flex justify-between">
                    <div className="flex flex-col justify-center h-full ml-4">
                        <Link to="/dashboard">Wallet</Link>
                    </div>
                <div className='flex justify-center items-center '>
                    {user ? 
                        (<>
                            <div className='pt-2.5 pr-2'>
                                Hi {user}
                            </div>
                            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2 ">
                                <div className="flex flex-col justify-center h-full text-xl">
                                    {p}
                                </div>
                            </div>
                        </>):(
                            <Button label={"Signin"} onClick={(e) => navigate("/signin")} />
                        )
                         }
                    
                    
                </div>
            </div>
        </>
    )
}

export default Appbar
