import React, { useState } from 'react'
import {
    Icon7,
    Icon8,
    Icon9,
    Icon71,
    Icon81,
    Icon91,
  } from "../../Svg/sidebar/sidebar";

export default function SidebarMenu(props) {
    const [menuItem,_ ]= useState([
        {link: "aggregation/scenario", icon:[Icon7, Icon71], text: "シナリオ"},
        {link: "aggregation/dialogue", icon:[Icon8, Icon81], text: "対話履歴"},
        {link: "aggregation/graph/table", icon:[Icon9, Icon91], text: "グラフ"},
        
        
      ]);

  return (
    <div className="sidebar-menu">
          {menuItem.map(item => {
            return  <div
            className={
              "sidebar-menu-item " + (props.curMenu === item.link ? "active" : "")
            }
            onClick={() => props.navigate(item.link)}
          >
            <img src={props.curMenu === item.link ? item.icon[1] : item.icon[0]} alt="" />
            <span className="side-item-text">{item.text}</span>
          </div>
    
          })}
    
        </div>
  )
}
