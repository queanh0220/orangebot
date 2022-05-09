import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState(1);

  const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/")
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo className="sidebar-logo" />
      </div>
      <div className="sidebar-main">
        <div
          className={"sidebar-item " + (active === 1 ? "active" : "")}
          onClick={() => setActive(1)}
        >
          <div className="active-icon"></div>
          <span className="side-item-text">プロファイル</span>
        </div>
        <div
          className={"sidebar-item " + (active === 2 ? "active" : "")}
          onClick={() => setActive(2)}
        >
           <div className="active-icon"></div>
          <span className="side-item-text">添付</span>
        </div>
        <div
          className={"sidebar-item " + (active === 3 ? "active" : "")}
          onClick={() => setActive(3)}
        >
           <div className="active-icon"></div>
          <span className="side-item-text">チャットボットUIの設定</span>
        </div>
        <div
          className={"sidebar-item " + (active === 4 ? "active" : "")}
          onClick={() => setActive(4)}
        >
           <div className="active-icon"></div>
          <span className="side-item-text">投稿の設定</span>
        </div>
        <div
          className={"sidebar-item " + (active === 5 ? "active" : "")}
          onClick={() => setActive(5)}
        >
           <div className="active-icon"></div>
          <span className="side-item-text">シナリオの設定</span>
        </div>
        <div
          className={"sidebar-item " + (active === 6 ? "active" : "")}
          onClick={() => setActive(6)}
        >
           <div className="active-icon"></div>
          <span className="side-item-text">集計</span>
        </div>
      </div>
      <div className="sidebar-footer sidebar-item">
          <Avatar src="https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg" />
          <span className="side-item-text">添付</span>
          <LogoutOutlined className="sidebar-logout" onClick={handleLogout}/>
      </div>
    </div>
  );
}
