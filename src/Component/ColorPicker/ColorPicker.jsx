import React, { useState } from "react";
import "./ColorPicker.css";
import { CirclePicker } from "react-color";
import { Input } from "antd";

export default function ColorPicker(props) {
  const colors = [
    "#EF4444",
    "#F97316",
    "#FACC15",
    "#4ADE80",
    "#2DD4BF",
    "#3B82F6",
    "#6366F1",
    "#EC4899",
    "#F43F5E",
    "#D946EF",
    "#8B5CF6",
    "#0EA5E9",
    "#10B981",
    "#84CC16",
  ];
  return (
    <div className="bg-item cp-content">
      {/* <CirclePicker
        width="203px"
        circleSize={24}
        circleSpacing={5}
      /> */}
      <div className="cp-color-container">
        {colors.map((data) => {
          return (
            <div className="cp-list-color" style={{ background: data }}></div>
        );
        })}
      </div>

      <div className="cp-set-color">
        <span>Hex</span>
        <Input
          className="cp-input"
          value={props.color}
          onChange={(e) => props.setColor(e.target.value)}
          prefix={
            <div className="cp-color" style={{ background: props.color }}></div>
          }
        />
      </div>
    </div>
  );
}
