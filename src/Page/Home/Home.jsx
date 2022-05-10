import React from "react";
import Topbar from "../../Component/Topbar/Topbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./Home.css";
import { Outlet } from "react-router-dom";

export default function Home(props) {
  console.log(props.children);
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Outlet />
      </div>
    </div>
  );
}
