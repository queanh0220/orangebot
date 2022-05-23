import React from "react";
import ChatboxButton from "../ChatboxButton/ChatboxButton";
import "./ChatboxInput.css";
export default function ChatboxInput(props) {
  return (
    <div className="chatboxSetting-input">
      <input
        type="text"
        className="input-text"
        placeholder={props.placeholder}
        value={props.text}
        onChange={props.setText}
      />
      <select name="" id="" >
        <option value="14">14</option>
      </select>
      <ChatboxButton
        color={props.color}
        setColor={props.setColor}
      />
    </div>
  );
}
