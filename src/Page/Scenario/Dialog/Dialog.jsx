import { Modal, Select, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosCustom from "../../../Api/axiosCustom";
import { uploadFile } from "../../../Api/uploadFile";
import Loading from "../../../Component/Loading/Loading";
import UpImg from "../../../Component/UpImg/UpImg";
import dialogIcon from "../../../Svg/plus-puple.svg";
import TableScenDialog from "../TableDialog/TableScenDialog";
import "./Dialog.css";
export default function Dialog(props) {
  const [name, setName] = useState("");
  const [tags, setTag] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [table, setTable] = useState([
    {
      message: "",
      control: {
        label: "",
        data: {
          Option: ["", ""],
          Datapicker: { stime: "", etime: "" },
          Dropdown: ["", ""],
        },
        input: ["input: text", "input: tel", "input: email"],
      },
      name: "",
      cv: false,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const createScen = async (data) => {
    setLoading(true);
    if (imgFile) {
      const upImg = await uploadFile(imgFile);
      data.name.icon = upImg.data;
    }
    const result = await axiosCustom.post("/scenarios", data).then(() => {
      toast.success("create scenario success");
    });
    setLoading(false);
    props.setShow(false);
    return result;
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(createScen, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-scenarios");
    },
  });

  const handleClose = () => props.setShow(false);
  const handleOk = async () => {
    //save info
    mutation.mutate({
      name: {
        icon: img,
        text: name,
      },
      date: new Date(),
      tags,
      table,
    });
    setTable([
      {
        message: "",
        control: {
          label: "",
          data: {
            Option: ["", ""],
            Datapicker: { stime: "", etime: "" },
            Dropdown: ["", ""],
          },
          input: ["input: text", "input: tel", "input: email"],
        },
        name: "",
        cv: false,
      },
    ]);
    
  };

  const handleChangeTag = (e) => {
    const str = e.target.value;
    if (!str) {
      tags.pop();
      setTag([...tags]);
      setInputTag(" ");
    } else if (/.+\s$/.test(str)) {
      tags.push(str.replace(/ /g, ""));
      setInputTag(" ");
    } else {
      setInputTag(str);
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <Modal
        className="scenario-dilog"
        title={
          <>
            <img src={dialogIcon} className="dialog-icon" />{" "}
            <span className="dialog-title">スクリプトを作成する</span>
          </>
        }
        width={700}
        visible={props.show}
        onOk={handleOk}
        onCancel={handleClose}
        footer={[
          <button
            key="back"
            className="button button-dialog cancel-dialog"
            onClick={handleClose}
          >
            キャンセル
          </button>,
          <button
            key="submit"
            className="button button-dialog"
            type="primary"
            loading={false}
            onClick={handleOk}
          >
            確定
          </button>,
        ]}
      >
        <div className="dialog-content">
          <div className="dialog-input">
            <label htmlFor="">シナリオ名</label>
            <input
              type="text"
              className="input-text"
              placeholder="シナリオ名をt入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="label-bottom">
              タグ
            </label>
            <div className="input-text dialog-input-tag">
              <div className="dialog-list-tag">
                {!!tags.length &&
                  tags.map((item, index) => {
                    return (
                      <Tag color={item} key={index}>
                        #{item}
                      </Tag>
                    );
                  })}
              </div>
              <input
                className="input-no-style"
                type="text"
                placeholder="タグを入力ください"
                value={inputTag}
                onChange={handleChangeTag}
              />
            </div>
          </div>
          <div className="dialog-img">
            <p>アイコン</p>
            <UpImg img={img} setImgFile={setImgFile} />
          </div>
          <TableScenDialog table={table} setTable={setTable} />
        </div>
      </Modal>
    </>
  );
}
