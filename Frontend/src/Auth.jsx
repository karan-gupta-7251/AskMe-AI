import React, { useState, useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import "./Auth.css";

function Auth({ setIsOpen }) {
    const { setCurrThreadId, setPrevChats, setNewChat, setReply, setAllThreads } = useContext(MyContext);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setError("");
                setEmail("");
                setPassword("");
                // Reset chat state with new threadId
                const newThreadId = uuidv1();
                setCurrThreadId(newThreadId);
                setPrevChats([]);
                setNewChat(true);
                setReply(null);
                setAllThreads([]);
                setIsOpen(false); // Close dropdown on successful login
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const handleSignup = async () => {
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setError("");
                setEmail("");
                setPassword("");
                // Reset chat state with new threadId
                const newThreadId = uuidv1();
                setCurrThreadId(newThreadId);
                setPrevChats([]);
                setNewChat(true);
                setReply(null);
                setAllThreads([]);
                setIsOpen(false); // Close dropdown on successful signup
            } else {
                setError(data.error || "Signup failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setCurrThreadId("");
        setPrevChats([]);
        setNewChat(true);
        setReply(null);
        setAllThreads([]);
        setIsOpen(false); // Close dropdown on logout
    };

    return (
        <div className="dropDown">
            <div className="dropDownHeader">
                <span className="dropDownTitle">{user ? "Account" : isLogin ? "Login" : "Sign Up"}</span>
                <i className="fa-solid fa-times dropDownClose" onClick={() => setIsOpen(false)}></i>
            </div>
            {user ? (
                <div className="dropDownItem" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                </div>
            ) : (
                <>
                    <div className="authForm">
                        <div className="authToggle">
                            <span
                                className={isLogin ? "authOption active" : "authOption"}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </span>
                            <span
                                className={!isLogin ? "authOption active" : "authOption"}
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </span>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="authInput"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="authInput"
                        />
                        <button
                            className="authButton"
                            onClick={isLogin ? handleLogin : handleSignup}
                        >
                            {isLogin ? "Login" : "Sign Up"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Auth;