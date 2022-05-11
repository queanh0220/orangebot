import React from "react";
import "./Upload.css";
import pinIcon from "../../Svg/pin.svg";
import Topbar from "../../Component/Topbar/Topbar";
import {
  FileFilled,
  FileZipFilled,
  PictureFilled,
  PlaySquareFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import storeIcon from "../../Svg/store.svg";
import { files } from "../../data";

export default function Upload() {
  const data = files;
  const process = 60;
  const columns = [
    {
      title: "ファイル名",
      dataIndex: "file",
      render: (file) => {
        let Icon;
        switch (file.type) {
          case "doc":
            Icon = <FileFilled />;
            break;
          case "img":
            Icon = <PictureFilled />;
            break;
          case "video":
            Icon = <PlaySquareFilled />;
            break;
          case "zip":
            Icon = <FileZipFilled />;
        }
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
      filters: [
        { text: ".docx", value: "doc" },
        { text: ".jpg", value: "img" },
        { text: ".mp4", value: "video" },
        { text: ".zip", value: "zip" },
      ],
      onFilter: (value, record) => record.file.type === value,
    },
    {
      title: "作成日",
      dataIndex: "datecreate",
      sorter: (a, b) => {
        return a.datecreate < b.datecreate
          ? -1
          : b.datecreate < a.datecreate
          ? 1
          : 0;
      },
      width: "20%",
    },
    {
      title: "サイズ",
      dataIndex: "size",
      sorter: (a, b) => a.size > b.size ? 1 : a.size < b.size ? -1 : 0,
      width: "20%",
    },
    {
      title: "更新日",
      dataIndex: "dateupdate",
      sorter: (a, b) => a.dateupdate > b.dateupdate ? 1 : a.dateupdate < b.dateupdate ? -1 : 0,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const uploadButton = (
    <button className="button">
      <UploadOutlined />
      <p>アップロード</p>
    </button>
  );

  return (
    <div className="upload">
      <Topbar icon={pinIcon} title="添付" button={uploadButton} />
      <div className="main">
        <div className="upload-content">
          <div className="upload-top">
            <div className="upload-top-item bg-item">
              <div className="upload-top-img upload-icon-doc">
                <FileFilled className="upload-top-icon" />
              </div>
              <div className="upload-top-text">
                <h2>1.5 GB</h2>
                <p>ドキュメント</p>
              </div>
            </div>
            <div className="upload-top-item bg-item">
              <div className="upload-top-img upload-icon-img">
                <PictureFilled className="upload-top-icon" />
              </div>
              <div className="upload-top-text">
                <h2>1.5 GB</h2>
                <p>ドキュメント</p>
              </div>
            </div>
            <div className="upload-top-item bg-item">
              <div className="upload-top-img upload-icon-video">
                <PlaySquareFilled className="upload-top-icon" />
              </div>
              <div className="upload-top-text">
                <h2>1.5 GB</h2>
                <p>ドキュメント</p>
              </div>
            </div>
            <div className="upload-top-item bg-item">
              <div className="upload-top-img upload-icon-zip">
                <FileZipFilled className="upload-top-icon" />
              </div>
              <div className="upload-top-text">
                <h2>1.5 GB</h2>
                <p>ドキュメント</p>
              </div>
            </div>
            <div className="upload-top-last bg-item">
              <div className="upload-top-text top-last">
                <img src={storeIcon} alt="" />
                <h2>保管所</h2>
              </div>
              <div className="upload-process">
                <div
                  className="upload-process-fill"
                  style={{ width: process + "%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="upload-list bg-item">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
