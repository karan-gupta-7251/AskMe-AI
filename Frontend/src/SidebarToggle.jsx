import React from "react";
import "./SidebarToggle.css";

function SidebarToggle({ toggleSidebar }) {
    return (
        <button className="sidebarToggle" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
            <span>Menu</span>
        </button>
    );
}

export default SidebarToggle;