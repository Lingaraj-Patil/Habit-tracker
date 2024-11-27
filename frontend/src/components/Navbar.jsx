
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-blue-500">
            <Link to="/dashboard" className="text-lg font-bold text-white">
                Habit Tracker
            </Link>
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
