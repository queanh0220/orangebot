import React from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarItem.css";

export default function SidebarItem(props) {
  const navigate = useNavigate();

  return (
    <div
      className={"sidebar-item " + (props.active ? "active" : "")}
      onClick={props.onClick}
    >
      <div className="active-icon"></div>
      <img
        src={props.icon}
        alt=""
        className={props.show ? "" : "sidebar-hidden"}
      />
      <span className={"side-item-text " + (props.show ? "" : "hidden")}>
        {props.text}
      </span>
    </div>
  );
}
