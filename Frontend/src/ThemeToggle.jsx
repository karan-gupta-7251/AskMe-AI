import React, { useState, useEffect } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
    const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem("theme") !== "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <button className="themeToggle" onClick={toggleTheme}>
            <i className={isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
        </button>
    );
}

export default ThemeToggle;