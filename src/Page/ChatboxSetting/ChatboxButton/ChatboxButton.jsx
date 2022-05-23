import React from "react";
import ColorPicker from "../../../Component/ColorPicker/ColorPicker";
import "./ChatboxButton.css"
export default function ChatboxButton(props) {
    const regColor = /^#([d-fD-F][a-fA-F0-9]){3}([a-fA-F0-9][a-fA-F0-9])?$/
  return (
    <button className="chatbox-btn" style={{ background: props.color }}>
      <div
        className="icon"
        style={{
          background: regColor.test(props.color) ? "black" : "white",
        }}
      ></div>
      <ColorPicker
        color={props.color}
        setColor={props.setColor}
      />
    </button>
  );
}
