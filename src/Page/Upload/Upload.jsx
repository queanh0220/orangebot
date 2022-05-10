import React from "react";
import "./Upload.css";
import pinIcon from "../../Svg/pin.svg";
import Topbar from "../../Component/Topbar/Topbar";
import { FileFilled } from "@ant-design/icons";
import { Table } from "antd";
import storeIcon from "../../Svg/store.svg"

export default function Upload() {
  
  return (
    <div>
      <Topbar icon={pinIcon} title="添付" />
      <div className="upload-content">
       
      </div>
    </div>
  );
}
