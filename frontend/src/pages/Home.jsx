
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-6 text-4xl font-bold">Welcome to Habit Tracker</h1>
            <div className="space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-2 text-white bg-blue-500 rounded"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-2 text-white bg-green-500 rounded"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
