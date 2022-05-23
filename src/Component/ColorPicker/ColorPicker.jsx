import React, { useEffect, useRef, useState } from "react";
import "./ColorPicker.css";
import { Input } from "antd";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";

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
  const [onShow, setOnShow] = useState(false);

  return (
    <div className="bg-item cp-content">
      <div className="cp-color-container">
        {colors.map((data) => {
          return (
            <div
              className={
                "cp-list-color " + (data === props.color ? "active" : "")
              }
              style={{ background: data, color: data }}
              onClick={() => props.setColor(data)}
            ></div>
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
            <div
              className="cp-color"
              style={{ background: props.color }}
              onClick={() => setOnShow((pre) => !pre)}
            ></div>
          }
        />
      </div>
      {onShow && (
        <ChromePicker
          className="cp-chrome"
          width={"100%"}
          color={props.color}
          onChange={(c) =>
            props.setColor("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
          }
        />
      )}
    </div>
  );
}
