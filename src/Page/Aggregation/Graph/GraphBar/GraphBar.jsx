import React from "react";
import "./GraphBar.css";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Bg1,
  Bg2,
  Bg3,
  Bg4,
} from "../../../../Svg/graph/iconBar";
import Item from "./Item";
import DoughnutChart from "../../../../Component/Chart/DoughnutChart";
import { Table } from "antd";
import { chartData } from "../../../../data";

export default function GraphBar() {
  const data = chartData
  const columns = [
    {
      title: "項番",
      dataIndex: "key",
    },
    {
      title: "シナリオ名",
      dataIndex: "name",
      
    },
    {
      title: "使用回数",
      dataIndex: "numUse",
    },
    {
      title: "ランディングページ",
      dataIndex: "landPage",
    },
  ];
  return (
    <div className="grbar">
      <div className="grbar-left bg-item">
        <p>シナリオがよく使われたページ</p>
        <div className="grbar-left-container">
          <Item
            text="spectrum"
            num="912,873"
            icon={Icon1}
            bg={Bg1}
            bgColor="#518bae"
          />
          <Item
            text="unsplash"
            num="232.873"
            icon={Icon2}
            bg={Bg2}
            bgColor="#494c4e"
          />
          <Item
            text="lazada"
            num="162.873"
            icon={Icon3}
            bg={Bg3}
            bgColor="#0c0f80"
          />
          <Item
            text="baemin"
            num="62,873"
            icon={Icon4}
            bg={Bg4}
            bgColor="#26c1bc"
          />
          <Item
            text="tiki"
            num="912,873"
            icon={Icon4}
            bg={Bg4}
            bgColor="#04b9f2"
          />
        </div>
      </div>
      <div className="grbar-right bg-item">
        <p>シナリオ間の使用率</p>
          <DoughnutChart />
          <div className="grbar-right-note">
            <div className="rgbar-note-item">
              <i  className="orange"></i>
              <span>面談日程</span>
            </div>
            <div className="rgbar-note-item">
            <i className="purple"></i>
              <span>面談日程</span>
            </div>
            <div className="rgbar-note-item">
            <i  className="pink"></i>
              <span>面談日程</span>
            </div>
          </div>
      </div>
      <div className="grbar-bottom bg-item">
        <p>シナリオの使用状況</p>
        <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      ></Table>
      </div>
    </div>
  );
}
