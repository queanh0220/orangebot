import { Modal, Select, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import UpImg from "../../../Component/UpImg/UpImg";
import dialogIcon from "../../../Svg/plus-puple.svg";
import TableScenDialog from "../TableDialog/TableScenDialog";
import "./Dialog.css";
export default function Dialog(props) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [img, setImg] = useState("");
  const [onSave, setOnSave] = useState(false);
  const handleClose = () => props.setShow(false);
  const handleOk = () => {
    //save info
    setOnSave(true);
  };

  useEffect(() => {
    console.log("onSave", onSave);
  }, [onSave]);

  const handleChangeTag = (e) => {
    const str = e.target.value;
    if (!str) {
      tag.pop();
      setTag([...tag]);
      setInputTag(" ");
    } else if (/.+\s$/.test(str)) {
      tag.push(str.replace(/ /g, ""));
      setInputTag(" ");
    } else {
      setInputTag(str);
    }
  };

  return (
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
              {!!tag.length &&
                tag.map((item, index) => {
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
          <UpImg />
        </div>
        <TableScenDialog onSave={onSave} endSave={() => setOnSave(false)} />
      </div>
    </Modal>
  );
}
