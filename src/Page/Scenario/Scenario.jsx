import React, { useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Scenario.css";
import icon from "../../Svg/scenario.svg";
import { PlusCircleFilled } from "@ant-design/icons";
import Tables from "../../Component/Table/Table";
import emptyImg from "../../Svg/empty.svg";
import Dialog from "./Dialog/Dialog";
import icon1 from "../../Svg/scenario/icon1.svg";
import { Table, Tag } from "antd";
import ScenarioTable from "./ScenarioTable/ScenarioTable";
export default function Scenario() {
  const [data, setData] = useState([
    {
      _id: "abc123",
      name: {
        icon: icon1,
        text: "インタビュースケジュール",
      },
      author: "UserName",
      date: "2022/05/25",
      tags: ["orange", "orange"],
      table: [
        {
          message: "電話番号をご入力ください。",
          control: {
            label: "[Input: text]",
            data: {
              Option: ["", ""],
              Datapicker: { stime: "", etime: "" },
              Dropdown: ["", ""],
            },
            input: ["input: text", "input: tel", "input: email"],
          },
          name: "名前",
          cv: false,
        },
      ],
    },
  ]);
  const [showDialog, setShowDialog] = useState(false);

  const columns = [
    {
      title: "シナリオ名",
      dataIndex: "name",
      render: (name) => {
        return (
          <>
            <img src={name.icon} alt="" />
            <span>{name.text}</span>
          </>
        );
      },
    },
    {
      title: "作成者",
      dataIndex: "author",
      width: "15%",
    },
    {
      title: "作成日",
      dataIndex: "date",
      width: "15%",
    },
    {
      title: "タグ",
      dataIndex: "tags",
      width: "25%",
      render: (tags) => {
     
        return tags.map((item, index) => {
          console.log("color",item.toLowerCase())
          return (
            <Tag color={item.toLowerCase()} key={index}>
              #{item}
            </Tag>
          );
        });
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: "Title",
      dataIndex: "_id",
      with: "15%",
      render: (id) => {
        return (
          <label htmlFor={id}>
            <a>Edit</a>
          </label>
        );
      },
    },
  ];
  return (
    <div className="scenario">
      <Topbar icon={icon} title="シナリオの設定" />
      <div className="main">
        <div className="scenario-content bg-item">
          {data.length === 0 ? (
            <>
              <div className="senario-empty">
                <img src={emptyImg} alt="" />
                <p className="color-g">
                  まだ投稿はありません。 今すぐ投稿を作成しましょう！
                </p>
                <button className="button" onClick={() => setShowDialog(true)}>
                  <PlusCircleFilled />
                  <p>新しいシナリオを作成する</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="button" onClick={() => setShowDialog(true)}>
                <PlusCircleFilled />
                <p>新しいシナリオを作成する</p>
              </button>
              <Tables
                columns={columns}
                data={data}
                pageSize={10}
                expandable={{
                  expandedRowRender: (record) => (
                    <ScenarioTable table={record.table} />
                  ),
                  expandIcon: ({ expanded, onExpand, record }) => (
                    <input
                      onClick={(e) => onExpand(record, e)}
                      id={record._id}
                      style={{ display: "none" }}
                    ></input>
                  ),
                }}
              />
            </>
          )}
          <Dialog show={showDialog} setShow={setShowDialog} />
        </div>
      </div>
    </div>
  );
}
