import { registerUser } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="p-6 space-y-4 bg-white rounded shadow-md"
            >
                <h2 className="text-xl font-bold">Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border"
                    required
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
