
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                dispatch(setUser(user));
                navigate('/gallery');
            }
        } catch (error) {
            if (error.code === "auth/cancelled") {

                setError("Cancelled popup request, please try again.");
            } else if (error.code === "auth/popup-closed-by-user") {

                setError("Popup closed by user, lease try again.");
            } else {

                setError("Error signing in with Google, please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Sign in with Google
                </button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Login;

