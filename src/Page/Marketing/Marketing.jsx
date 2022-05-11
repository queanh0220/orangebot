import React from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Marketing.css";
import icon from "../../Svg/marketing.svg";
import EditorComp from "../../Component/Editor/EditorComp";
export default function Marketing() {
  return (
    <div className="marketing">
      <Topbar icon={icon} title="投稿の設定" />
      
    </div>
  );
}
