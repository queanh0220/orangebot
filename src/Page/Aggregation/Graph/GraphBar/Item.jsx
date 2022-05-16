import React from "react";

export default function Item(props) {
  return (
    <div className="grbar-left-item">
      <div className="grbar-left-box" style={{ backgroundColor: props.bgColor }}>
        <img className="grbar-left-icon" src={props.icon} alt="" />
        <div className="grbar-left-text">
          <span className="text">{props.text}</span>
          <span className="num">{props.num}</span>
        </div>
        <img src={props.bg} alt="" className="bg-img" />
      </div>
      <span className="grbar-left-mail">{props.text}.com</span>
    </div>
  );
}
