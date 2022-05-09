import React from "react";
import Topbar from "../../Component/Topbar/Topbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./Home.css"

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Topbar />
      </div>
    </div>
  );
}
