import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import Logo from "../Logo/Logo";
import { Avatar } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import axiosCustom from "../../Api/axiosCustom";
import { AuthContext } from "../../ContextApi/context-api";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const [showmenu, setShowmenu] = useState(true);
  const [curMenu, setCurMenu] = useState("aggregation/scenario")
  const location = useLocation().pathname;

  const getInfo = () => {
    return axiosCustom
      .get("/users")
      .then((res) => {
        const { _id, password, ...data } = res.data;
        return { ...data };
      })
  };

  const {data} = useQuery("get-profile", getInfo)
  console.log(location)
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    auth.logout();
    toast.success("Logout success")
  };

  const handleNavigate = (active) => {
    if(active.includes("aggregation")){
      setCurMenu(active);
    } 
    navigate(active)
  };

  useEffect(() => {
    if(location.includes("aggregation")){
      setShowmenu(true);
    } 
    else {
      setShowmenu(false)
    }
  }, [location])

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
          text="??????????????????"
          icon={Icon1}
          active={location === "/home/profile" ? true : false}
          show={show}
          onClick={() => handleNavigate("profile")}
        />
        <SidebarItem
          text="??????"
          icon={Icon2}
          active={location === "/home/upload" ? true : false}
          show={show}
          onClick={() => handleNavigate("upload")}
        />
        <SidebarItem
          text="?????????????????????UI?????????"
          icon={Icon3}
          active={location === "/home/chatbox-setting" ? true : false}
          show={show}
          onClick={() => handleNavigate("chatbox-setting")}
        />
        <SidebarItem
          text="???????????????"
          icon={Icon4}
          active={location === "/home/marketing" ? true : false}
          show={show}
          onClick={() => handleNavigate("marketing")}
        />
        <SidebarItem
          text="?????????????????????"
          icon={Icon5}
          active={location === "/home/scenario" ? true : false}
          show={show}
          onClick={() => handleNavigate("scenario")}
        />
        <SidebarItem
          text={<div className="sidebar-text-icon">
            <span>??????</span>
            <DownOutlined />
          </div>}
          icon={Icon6}
          active={location.includes("/home/aggregation") ? true : false}
          show={show}
          onClick={() => handleNavigate(curMenu)} 
          showmenu={showmenu}
          curMenu={curMenu}
          navigate={handleNavigate}
        >
       <p>sss</p>
        </SidebarItem>
      </div>
      <div className="sidebar-footer sidebar-item">
        <Avatar src={data? data.img : "https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg"} />
        <span className={"side-item-text " + (show ? "" : "hidden")}>{data? data.name:"??????"}</span>
        {show && (
          <LogoutOutlined className={"sidebar-logout"} onClick={handleLogout} />
        )}
      </div>
    </div>
  );
}
