import React, { useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Scenario.css";
import icon from "../../Svg/scenario.svg";
import { PlusCircleFilled } from "@ant-design/icons";
import Tables from "../../Component/Table/Table";
import emptyImg from "../../Svg/empty.svg";
import Dialog from "./Dialog/Dialog";
import BarChart from "../../Component/Chart/BarChart";
import icon1 from "../../Svg/scenario/icon1.svg"
export default function Scenario() {
  const [data, setData] = useState([{
    name: {
      icon: icon1,
      text: "インタビュースケジュール"
    },
    author: "UserName",
    date: "2022/05/25",
    tag: [],
  }]);
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
      dataIndex: "tag",
      width: "25%"
    },
    {
      title: "Title",
      dataIndex: "title",
      with: "15%",
      render: () => {
        return <a>Edit</a>
      }
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
                <button className="button" onClick={()=>setShowDialog(true)}>
                <PlusCircleFilled  />
                <p>新しいシナリオを作成する</p>
              </button>
              </div>
              
            </>
          ) : (
            <>
              <button className="button" onClick={()=>setShowDialog(true)}>
                <PlusCircleFilled/>
                <p>新しいシナリオを作成する</p>
              </button>
              <Tables columns={columns} data={data} pageSize={10} />
            </>
          )}
           <Dialog show={showDialog} setShow={setShowDialog}/>
        </div>
      </div>
    </div>
  );
}
