import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        console.log("Login button clicked!");  // Verify if this is logged

        if (!username || !password) {
            alert('Username and password are required');
            return;
        }

        const url = API_URL + '/login';
        const data = { username, password };

        console.log("Sending request to:", url, "with data:", data);  // Log the request data

        axios.post(url, data)
        .then((res) => {
            console.log("Response from server:", res);  // Log the full response
            if (res.data.message && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                console.log("Login successful, navigating to home...");
                navigate('/');
            } else {
                console.log("Login failed:", res.data.message);
            }
        })
        .catch((err) => {
            alert('SERVER ERR');
            console.error("Login Error:", err);
        });
    };

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3> Welcome to Login Page </h3>
                <br />
                USERNAME
                <input className="form-control" type="text" value={username}
                    onChange={(e) => {
                        setusername(e.target.value);
                        console.log("Username:", e.target.value);  // Debugging log
                    }} />
                <br />
                PASSWORD
                <input className="form-control" type="password" value={password}
                    onChange={(e) => {
                        setpassword(e.target.value);
                        console.log("Password:", e.target.value);  // Debugging log
                    }} />
                <br />
                <button className="btn btn-primary mr-3" onClick={handleApi}> LOGIN </button>
                <Link className="m-3" to="/signup"> SIGNUP </Link>
            </div>
        </div>
    );
}

export default Login;
