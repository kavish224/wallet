import React, { useEffect } from 'react'
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Users() {
    const [users, setUsers] = React.useState([]);
    const [filter, setFilter] = React.useState("");
    useEffect(() => {
        axios.post("http://localhost:3000/api/v1/user/bulk?filter="+filter)
            .then((res)=>setUsers(res.data.user))
    }, [filter])
    return (
        <div>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e)=>setFilter(e.target.value)}type="text" placeholder='Search users...' className="w-full px-2 py-1 my-2 border rounded border-slate-200"/>
            </div>
            <div>
            {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}
function User({user}){
    const navigate =useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e)=>navigate("/send?id=" + user._id + "&name=" + user.firstname)} label={"Send Money"} />
        </div>
    </div>
}
export default Users
