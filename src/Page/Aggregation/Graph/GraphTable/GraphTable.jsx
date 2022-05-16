import {
  FileFilled,
  FileZipFilled,
  PictureFilled,
  PlaySquareFilled,
} from "@ant-design/icons";
import { Table } from "antd";
import React, { useState } from "react";
import { files } from "../../../../data";

export default function GraphTable() {
  const [data, setData] = useState(files);
  const columns = [
    {
      title: "項番",
      dataIndex: "key",
    },
    {
      title: "ファイル名",
      dataIndex: "file",
      filters: [
        { text: ".docx", value: "doc" },
        { text: ".jpg", value: "img" },
        { text: ".mp4", value: "video" },
        { text: ".zip", value: "zip" },
      ],
      onFilter: (value, record) => record.file.type === value,
      width: "30%",
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
    },
    {
      title: "クリック数",
      dataIndex: "mouseclick",
      sorter: (a, b) => (a.size > b.size ? 1 : a.size < b.size ? -1 : 0),
    },
    {
      title: "シナリオ",
      dataIndex: "scen",
      sorter: (a, b) =>
        a.dateupdate > b.dateupdate ? 1 : a.dateupdate < b.dateupdate ? -1 : 0,
    },
  ];
  return (
    <div className="graph-table bg-item">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      ></Table>
    </div>
  );
}
