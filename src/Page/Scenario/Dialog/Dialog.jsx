import { Modal } from "antd";
import React, { useState } from "react";
import UpImg from "../../../Component/UpImg/UpImg";
import dialogIcon from "../../../Svg/plus-puple.svg"
import TableScenDialog from "../TableDialog/TableScenDialog";
import "./Dialog.css"
export default function Dialog(props) {

  const handleClose = () => props.setShow(false);
  const handleOk = () => {};
  const handleCancel = () => props.setShow(false);

  return (
    <Modal
      
      className="scenario-dilog"
      title={
        <>
          <img src={dialogIcon} className="dialog-icon"/> <span className="dialog-title">スクリプトを作成する</span>
        </> 
      }
      width={700}
      visible={props.show}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button key="back" className="button button-dialog cancel-dialog" onClick={handleClose}>
          キャンセル
        </button>,
        <button key="submit" className="button button-dialog" type="primary" loading={false} onClick={handleOk}>
          確定
        </button>
      ]}
    >
      <div className="dialog-content">
           <div className="dialog-input">
             <label htmlFor="">シナリオ名</label>
             <input type="text" className="input-text" placeholder="シナリオ名をt入力してください"/>
             <label htmlFor="" className="label-bottom">タグ</label>
             <input type="text" className="input-text" placeholder="タグを入力ください"/>
           </div>
           <div className="dialog-img">
               <p>アイコン</p>
             <UpImg />
           </div>
           <TableScenDialog />
         </div>
    </Modal>
  );
}
