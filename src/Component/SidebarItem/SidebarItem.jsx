import React, { useState } from "react";
import "./SidebarItem.css";
import SidebarMenu from "./SidebarMenu";

export default function SidebarItem(props) {
  return (
    <>
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
      {props.showmenu && <SidebarMenu curMenu={props.curMenu} navigate={props.navigate}/>}
    </>
  );
}
