import React from "react";
import "./Logo.css"
import logo from "../../Svg/logo.svg"
export default function Logo(props) {
  return (
      <>
    <div className={"logo "+props.className}>
      <img src={logo} alt="Logo" />
      {props.show && <span>Orange Bot</span>}
    </div>
    </>
  );
}
