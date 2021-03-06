import React, { useContext, useEffect, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoadingContext } from "../../ContextApi/context-api";
import LoadingComp from "../../Component/Loading/LoadingComp";
export default function Marketing() {
  const [create, setCreate] = useState(false);
  const [active, setActive] = useState({});
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const loading = useContext(LoadingContext);

  const getData = () => {
    return axiosCustom.get("/posts").then((res) => {
      console.log("post", res.data);
      return res.data;
    });
  };

  const createData = async (data) => {
    loading.setLoading(true);
    const result = await axiosCustom.post("/posts", data).then(() => {
      toast.success("create success!");
    });
    loading.setLoading(false);
    return result;
  };
  const updateData = async (post) => {
    loading.setLoading(true);
    const { _id, ...data } = post;
    console.log("item", _id, data);
    const result = await axiosCustom.put("/posts/" + _id, data).then(() => {
      toast.success("update success!");
    });
    loading.setLoading(false);
    return result;
  };

  const deleteData = async (id) => {
    loading.setLoading(true);
    const result = await axiosCustom.delete("/posts/" + id).then(() => {
      toast.success("delete success!");
    });
    loading.setLoading(false);
    return result;
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("get-posts", getData);

  const mutationUpdate = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-posts");
    },
  });
  const mutationCreate = useMutation(createData, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-posts");
    },
  });

  const mutationDelete = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-posts");
    },
  });

  const handleCreate = () => {
    console.log(1);
    setCreate(true);
    setIsEdit(false);
    setActive({});
  };

  const handleSave = () => {
    if (isEdit) {
      active.content = content;
      mutationUpdate.mutate(active);
      setCreate(false);
      return;
    }
    const today = new Date();
    mutationCreate.mutate({
      status: "??????",
      date:
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate(),
      content: content,
    });
    setCreate(false);
  };

  const handleEdit = () => {
    setCreate(true);
  };

  const handlePost = (item) => {
    item.status === "??????" ? (item.status = "??????") : (item.status = "??????");
    mutationUpdate.mutate(item);
  };

  const handleActive = (item) => {
    setActive(item);
    setIsEdit(true);
  };

  const handleDelete = () => {
    mutationDelete.mutate(active._id);
    setIsEdit(false);
    setCreate(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log("mkt");
  });
  return (
    <div className="marketing">
      {(() => {
        console.log("data", data);
      })()}
      <Topbar icon={icon} title="???????????????" />
      <div className="main">
        <div className="marketing-content">
          <div className="marketing-left bg-item">
            <div className="marketing-left-list">
              {isLoading ? (
                <LoadingComp />
              ) : (data.length === 0 ? (
                <div className="marketing-empty">
                  <img src={emptyImg} alt="" />
                  <p className="color-g">
                    ????????????????????????????????? ??????????????????????????????????????????
                  </p>
                </div>
              ) : (
                <div className="marketing-list">
                  <div className="marketing-list-header">
                    <span>????????????</span>
                    <span>???????????????</span>
                    <span>?????????</span>
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
                          <div style={{ lineHeight: "0px" }}>?????????</div>
                          <div className="marketing-item-stt">{index + 1}</div>
                        </span>
                        <button
                          className={
                            item.status === "??????" ? "marketing-btn-active" : ""
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
              ))}
            </div>
            <button className="button" onClick={handleCreate}>
              <PlusCircleOutlined />
              <p>??????????????????</p>
            </button>
          </div>
          <div className="marketing-right bg-item">
            <div className="marketiing-right-head">
              <span className="fw-700">?????????</span>
              <span className="color-g">???????????????</span>
            </div>
            {!!create ? (
              <EditorComp active={active} setContent={setContent} />
            ) : (
              <div className="marketing-editor">
                {active.content ? (
                  parse(active.content)
                ) : (
                  <p className="empty-text">
                    ?????????????????????????????????????????????????????????
                  </p>
                )}
              </div>
            )}

            <div className="marketing-right-foot">
              <div className="marketing-right-button">
                <button className={"button " + (!!create ? "" : "inactive")}>
                  <SendOutlined className="rotate-l-45" />
                  <p>???????????????</p>
                </button>
                <button className={"button " + (!!create ? "" : "inactive")}>
                  <CaretDownOutlined />
                </button>
              </div>
              {isEdit ? (
                <div className="marketing-edit-btn">
                  <button className="button delete" onClick={handleDelete}>
                    <DeleteOutlined />
                    <p>??????</p>
                  </button>
                  <button
                    className="button"
                    onClick={create ? handleSave : handleEdit}
                  >
                    {create ? <SaveFilled /> : <EditOutlined />}
                    <p>??????</p>
                  </button>
                </div>
              ) : (
                <button
                  className={"button " + (!!create ? "" : "inactive")}
                  onClick={handleSave}
                >
                  <SaveFilled />
                  <p>??????</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
