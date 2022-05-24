import React, { useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Marketing.css";
import icon from "../../Svg/marketing.svg";
import EditorComp from "../../Component/Editor/EditorComp";
import emptyImg from "../../Svg/empty.svg";
import parse from "html-react-parser";
import {
  CaretDownOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SaveFilled,
  SendOutlined,
} from "@ant-design/icons";
import axiosCustom from "../../Api/axiosCustom";
import { toast } from "react-toastify";
export default function Marketing() {
  const [data, setData] = useState([
    // { stt: "テーマ①", status: "無効", date: "2022/02/25", content: "" },
  ]);
  const [create, setCreate] = useState(false);
  const [active, setActive] = useState({});
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const getData = () => {
    axiosCustom.get("/posts").then((res) => {
      console.log("post",res.data);
      setData(res.data);
    });
  };

  const createData = (data) => {
    axiosCustom.post("/posts", data).then(() => {
      getData();
      toast.success("create success!");
    });
  };
  const updateData = (id, data) => {
    axiosCustom.put("/posts/" + id, data).then(() => {
      getData();
      toast.success("update success!");
    });
  };

  const deleteData = (id) => {
    axiosCustom.delete("/posts/" + id).then(() => {
      getData()
      toast.success("delete success!");
    });
  };

  const handleCreate = () => {
    console.log(1);
    setCreate(true);
    setIsEdit(false);
    setActive({});
  };

  const handleSave = () => {
    if (isEdit) {
      active.content = content;
      const {_id, ...data} = active;
      updateData(_id, data);
      setCreate(false);
      return;
    }
    const today = new Date();
    createData({
      status: "無効",
      date:
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate(),
      content: content,
    })
    setCreate(false);
  };

  const handleEdit = () => {
    setCreate(true);
  };

  const handlePost = (item) => {
    item.status === "有効" ? (item.status = "無効") : (item.status = "有効");
    const {_id, ...data} = item;
    updateData(_id, data);
  };

  const handleActive = (item) => {
    setActive(item);
    setIsEdit(true);
  };

  const handleDelete = () => {
    deleteData(active._id)
    setIsEdit(false);
    setCreate(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="marketing">
      <Topbar icon={icon} title="投稿の設定" />
      <div className="main">
        <div className="marketing-content">
          <div className="marketing-left bg-item">
            <div className="marketing-left-list">
              {data.length === 0 ? (
                <div className="marketing-empty">
                  <img src={emptyImg} alt="" />
                  <p className="color-g">
                    まだ投稿はありません。 今すぐ投稿を作成しましょう！
                  </p>
                </div>
              ) : (
                <div className="marketing-list">
                  <div className="marketing-list-header">
                    <span>投稿一覧</span>
                    <span>スターテス</span>
                    <span>作成日</span>
                  </div>
                  {data.map((item, index) => {
                    return (
                      <div
                        className={
                          "marketing-list-item " +
                          (active === item ? "active" : "")
                        }
                        onClick={() => handleActive(item)}
                      >
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ lineHeight: "0px" }}>テーマ</div>
                          <div className="marketing-item-stt">{index + 1}</div>
                        </span>
                        <button
                          className={
                            item.status === "有効" ? "marketing-btn-active" : ""
                          }
                          onClick={() => handlePost(item)}
                        >
                          {item.status}
                        </button>
                        <span>{item.date}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button className="button" onClick={handleCreate}>
              <PlusCircleOutlined />
              <p>新規投稿作成</p>
            </button>
          </div>
          <div className="marketing-right bg-item">
            <div className="marketiing-right-head">
              <span className="fw-700">テーマ</span>
              <span className="color-g">スターテス</span>
            </div>
            {!!create ? (
              <EditorComp active={active} setContent={setContent} />
            ) : (
              <div className="marketing-editor">
                {active.content ? (
                  parse(active.content)
                ) : (
                  <p className="empty-text">
                    現在、この投稿のコンテンツはありません
                  </p>
                )}
              </div>
            )}

            <div className="marketing-right-foot">
              <div className="marketing-right-button">
                <button className={"button " + (!!create ? "" : "inactive")}>
                  <SendOutlined className="rotate-l-45" />
                  <p>今すぐ投稿</p>
                </button>
                <button className={"button " + (!!create ? "" : "inactive")}>
                  <CaretDownOutlined />
                </button>
              </div>
              {isEdit ? (
                <div className="marketing-edit-btn">
                  <button className="button delete" onClick={handleDelete}>
                    <DeleteOutlined />
                    <p>削除</p>
                  </button>
                  <button
                    className="button"
                    onClick={create ? handleSave : handleEdit}
                  >
                    {create ? <SaveFilled /> : <EditOutlined />}
                    <p>編集</p>
                  </button>
                </div>
              ) : (
                <button
                  className={"button " + (!!create ? "" : "inactive")}
                  onClick={handleSave}
                >
                  <SaveFilled />
                  <p>保存</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
