import React from "react";
import Topbar from "../../../Component/Topbar/Topbar";
import "./Scenario.css";
import icon from "../../../Svg/scenario.svg";
import icon1 from "../../../Svg/aggregation/scenario/icon1.svg";
import icon2 from "../../../Svg/aggregation/scenario/icon2.svg";
import icon3 from "../../../Svg/aggregation/scenario/icon3.svg";
import icon4 from "../../../Svg/aggregation/scenario/icon4.svg";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Table } from "antd";
import { coupon } from "../../../data";

export default function AgScenario() {
    const data = coupon;
  const { RangePicker } = DatePicker;
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
    },
    {
      title: "名前",
      dataIndex: "name",
      
    },
    {
      title: "作成日",
      dataIndex: "number",
     
    },
    {
      title: "開始日",
      dataIndex: "sdate",
     
    },
    {
      title: "終了日",
      dataIndex: "edate",
      
    },
    {
        title: "電話番号",
        dataIndex: "phone",
       
    },
    {
        title: "対応状況",
        dataIndex: "checkbox",
        render: () => {
            return <input type="checkbox" />
        }
    },
  ];
  return (
    <div className="ag-scen">
      <Topbar icon={icon} title="集計 / シナリオ" />
      <div className="main">
        <div className="ag-scen-content">
          <div className="ag-scen-item bg-item">
            <div className="ag-scen-top">
              <div className="ag-scen-img">
                <img src={icon1} alt="" />
              </div>
              <div className="ag-scen-title">
                <span>クーポン</span>
                <CaretDownOutlined />
              </div>
              <div className="ag-scen-date">
                <label>期間</label>
                <RangePicker />
              </div>
            </div>
            <Table className="scenario-table"
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
          </div>
          <div className="ag-scen-item bg-item">
            <div className="ag-scen-top">
              <div className="ag-scen-img">
                <img src={icon2} alt="" />
              </div>
              <div className="ag-scen-title">
                <span>航空券予約</span>
                <CaretRightOutlined />
                
              </div>
              <div className="ag-scen-date">
                <label>期間</label>
                <RangePicker />
              </div>
            </div>
         
          </div>
          <div className="ag-scen-item bg-item">
            <div className="ag-scen-top">
              <div className="ag-scen-img">
                <img src={icon3} alt="" />
              </div>
              <div className="ag-scen-title">
                <span>インタビュースケジュール</span>
                <CaretRightOutlined />
              </div>
              <div className="ag-scen-date">
                <label>期間</label>
                <RangePicker />
              </div>
            </div>
         
          </div>
          <div className="ag-scen-item bg-item">
            <div className="ag-scen-top">
              <div className="ag-scen-img">
                <img src={icon4} alt="" />
              </div>
              <div className="ag-scen-title">
                <span>航空券予約</span>
                <CaretRightOutlined />
              </div>
              <div className="ag-scen-date">
                <label>期間</label>
                <RangePicker />
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}
