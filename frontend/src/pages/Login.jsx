import { useState } from "react"
import { loginUser } from "../api/userAPI";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data = await loginUser({email,password});
            localStorage.setItem("token",data.token);
            navigate("/dashboard");
        }
        catch(error){
            alert(error.response.data.message || "Login Failed");
        }
    }

    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-6 space-y-4 bg-white rounded shadow-md"
            >
                <h2 className="text-xl font-bold">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border"
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded">
                    Login
                </button>   
            </form>
        </div>
    )
}

export default Login;