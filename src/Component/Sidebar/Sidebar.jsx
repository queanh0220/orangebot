import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "../../Svg/sidebar/sidebar";
import toggle from "../../Svg/sidebar/toggle.svg";
import SidebarItem from "../SidebarItem/SidebarItem";

export default function Sidebar() {
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  const handleNavigate = (active) => {
    if (active === 0) return;
    setActive(active);
    switch (active) {
      case 1:
        navigate("profile");
        break;
      case 2:
        navigate("upload");
        break;
    }
  };

  return (
    <div className={"sidebar " + (show ? "" : "width-60px")}>
      <div className="sidebar-toggle" onClick={() => setShow((pre) => !pre)}>
        <i className="sidebar-toggle-icon">
          <img src={toggle} alt="" className={show ? "" : "reverse"} />
        </i>
      </div>

      <div className="sidebar-header">
        <Logo className="sidebar-logo" show={show} />
      </div>
      <div className="sidebar-main">
        <SidebarItem
          text="プロファイル"
          icon={Icon1}
          active={active === 1 ? true : false}
          show={show}
          onClick={() => handleNavigate(1)}
        />
        <SidebarItem
          text="添付"
          icon={Icon2}
          active={active === 2 ? true : false}
          show={show}
          onClick={() => handleNavigate(2)}
        />
        <SidebarItem
          text="チャットボットUIの設定"
          icon={Icon3}
          active={active === 3 ? true : false}
          show={show}
          onClick={() => handleNavigate(3)}
        />
        <SidebarItem
          text="投稿の設定"
          icon={Icon4}
          active={active === 4 ? true : false}
          show={show}
          onClick={() => handleNavigate(4)}
        />
        <SidebarItem
          text="シナリオの設定"
          icon={Icon5}
          active={active === 5 ? true : false}
          show={show}
          onClick={() => handleNavigate(5)}
        />
        <SidebarItem
          text="集計"
          icon={Icon6}
          active={active === 6 ? true : false}
          show={show}
          onClick={() => handleNavigate(6)}
          F
        />
      </div>
      <div className="sidebar-footer sidebar-item">
        <Avatar src="https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg" />
        <span className={"side-item-text " + (show ? "" : "hidden")}>添付</span>
        {show && (
          <LogoutOutlined className={"sidebar-logout"} onClick={handleLogout} />
        )}
      </div>
    </div>
  );
}
