import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import "./Topbar.css"
export default function Topbar(props) {
  return (
    <div className='topbar'>
        <div className="topbar-left">
          <img className="topbar-left-icon" src={props.icon}></img>
          <span className='topbar-left-text'>{props.title}</span>
        </div>
        <div className="topbar-right">
          <label className='topbar-right-label'>テナント名</label>
          <input type="text" className='topbar-right-input' placeholder='テナント①'/>
          <i className="topbar-right-icon"><UserOutlined /></i>
        </div>
    </div>
  )
}
