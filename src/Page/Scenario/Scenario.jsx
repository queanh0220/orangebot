import React, { useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Scenario.css";
import icon from "../../Svg/scenario.svg";
import { PlusCircleFilled } from "@ant-design/icons";
import Tables from "../../Component/Table/Table";
import emptyImg from "../../Svg/empty.svg";
import Dialog from "./Dialog/Dialog";
export default function Scenario() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "シナリオ名",
      dataIndex: "name",
      render: (file) => {
        let Icon = <img src="" alt="" />;

        return (
          <>
            <span className={"table-icon upload-icon-" + file.type}>
              {Icon}
            </span>
            <span>{file.name}</span>
          </>
        );
      },
      width: "20%",
    },
    {
      title: "作成者",
      dataIndex: "author",
      width: "20%",
    },
    {
      title: "作成日",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "タグ",
      dataIndex: "tag",
    },
    {
      title: "Title",
      dataIndex: "title",
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
                <button className="button">
                <PlusCircleFilled />
                <p>新しいシナリオを作成する</p>
              </button>
              </div>
              
            </>
          ) : (
            <>
              <button className="button">
                <PlusCircleFilled />
                <p>新しいシナリオを作成する</p>
              </button>
              <Tables columns={columns} pageSize={10} />
              <Dialog />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
