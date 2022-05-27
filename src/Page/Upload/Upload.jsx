import React, { useEffect, useState } from "react";
import "./Upload.css";
import pinIcon from "../../Svg/pin.svg";
import Topbar from "../../Component/Topbar/Topbar";
import {
  CloseOutlined,
  DeleteFilled,
  FileFilled,
  FileZipFilled,
  PictureFilled,
  PlaySquareFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import storeIcon from "../../Svg/store.svg";
import { files } from "../../data";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { dateToString, formatDate, timeSince } from "../../Utils/formatDate";
import { formatBytes } from "../../Utils/formatBytes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { uploadFile } from "../../Api/uploadFile";

export default function Upload() {
  const store = 60;

  const getData = () => {
    return axios.get(process.env.REACT_APP_API_URL+"files").then((res) => {
      let sizeDoc = 0,
        sizeVideo = 0,
        sizeZip = 0,
        sizeImg = 0;
      res.data.forEach((item) => {
        switch (item.file.type) {
          case "doc":
            sizeDoc += item.size;
            break;
          case "img":
            sizeImg += item.size;
            break;
          case "video":
            sizeVideo += item.size;
            break;
          case "zip":
            sizeZip += item.size;
            break;
        }
      });
      return {
        files: [...res.data],
        sizeDoc: formatBytes(sizeDoc),
        sizeImg: formatBytes(sizeImg),
        sizeVideo: formatBytes(sizeVideo),
        sizeZip: formatBytes(sizeZip),
      };
    });
  };

  const upload = (data) => {
    return axios.post(process.env.REACT_APP_API_URL+"files", data);
  };

  const deleteFile = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL+"files/" + id);
  };
  
  const { data, isLoading } = useQuery("get-files", getData, {initialData: []});
  useEffect(() => {
    console.log("data",data)
  },[data])
  const queryClient = useQueryClient();
  
  const mutationUpdate = useMutation(upload, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-files");
    },
  });

  const mutationDelete = useMutation(deleteFile, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-files");
    },
  });

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
      render: (date) => {
        return timeSince(new Date(date)).toString();
      },
    },
    {
      title: "サイズ",
      dataIndex: "size",
      sorter: (a, b) => (a.size > b.size ? 1 : a.size < b.size ? -1 : 0),
      width: "20%",
      render: (size) => {
        return formatBytes(size);
      },
    },
    {
      title: "更新日",
      dataIndex: "dateupdate",
      sorter: (a, b) =>
        a.dateupdate > b.dateupdate ? 1 : a.dateupdate < b.dateupdate ? -1 : 0,
      render: (date) => {
        return dateToString(new Date(date));
      },
    },
    {
      title: <DeleteFilled className="upload-icon" />,
      dataIndex: "_id",
      render: (id) => {
        return (
          <div className="upload-delete-icon">
          <CloseOutlined
        
            onClick={() => mutationDelete.mutate(id)}
          />
          </div>
        );
      },
      width: "16px",
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

  const getType = (ex) => {
    switch (ex) {
      case "doc":
      case "docx":
      case "pdf":
      case "txt":
      case "pptx":
        return "doc";
      case "mp4":
        return "video";
      case "png":
      case "jpeg":
      case "jpg":
        return "img";
      case "rar":
      case "zip":
      case "7z":
      case "rpm":
        return "zip";
      default:
        return "undefined";
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    let result = await uploadFile(file);
    mutationUpdate.mutate({
      file: { name: file.name, type: getType(file.name.split(".").pop()) },
      datecreate: new Date(),
      dateupdate: new Date(),
      size: file.size,
      link: result.data,
    });
  };

  const uploadButton = (
    <button className="button">
      <label htmlFor="upload-file">
        <UploadOutlined />
        <p>アップロード</p>
      </label>
      <input
        type="file"
        id="upload-file"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
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
                  <h2>{data.sizeDoc}</h2>
                  <p>ドキュメント</p>
                </div>
              </div>
              <div className="upload-top-item bg-item">
                <div className="upload-top-img upload-icon-img">
                  <PictureFilled className="upload-top-icon" />
                </div>
                <div className="upload-top-text">
                  <h2>{data.sizeImg}</h2>
                  <p>ドキュメント</p>
                </div>
              </div>
              <div className="upload-top-item bg-item">
                <div className="upload-top-img upload-icon-video">
                  <PlaySquareFilled className="upload-top-icon" />
                </div>
                <div className="upload-top-text">
                  <h2>{data.sizeVideo}</h2>
                  <p>ドキュメント</p>
                </div>
              </div>
              <div className="upload-top-item bg-item">
                <div className="upload-top-img upload-icon-zip">
                  <FileZipFilled className="upload-top-icon" />
                </div>
                <div className="upload-top-text">
                  <h2>{data.sizeZip}</h2>
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
                    style={{ width: store + "%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="upload-list bg-item">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data.files}
                rowKey={(record) => record["_id"]}
                pagination={{ pageSize: 5 }}
                loading={isLoading}
              />
            </div>
          </div>
      </div>
    </div>
  );
}
