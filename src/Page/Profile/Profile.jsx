import React, { useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Profile.css";
import person from "../../Svg/person.svg";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
export default function Profile() {

  const [info, setInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
  });
  const [editInfo, setEditInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
  });
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const handleEditInfo = () => {
    setInfo(editInfo);
    setIsEditInfo((pre) => !pre);
  };

  const handleEditAccount = () => {
    setIsEditPassword(false);
    setIsEditEmail(false);
  };

  return (
    <div className="profile">
      <Topbar icon={person} title="プロファイル" />
      <div className="main">
        <div className="profile-content">
          <div className="profile-left bg-item">
            <UpImg className="profile-left-img" />
            
            <div className="profile-left-text">
              {isEditInfo ? (
                <div className="profile-left-edit">
                  <input
                    type="text"
                    placeholder="本田 圭佑"
                    className="input-text"
                    value={editInfo.name}
                    onChange={(e) =>
                      setEditInfo({ ...info, name: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="input-text"
                    value={editInfo.birthday}
                    onChange={(e) =>
                      setEditInfo({ ...info, birthday: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div className="profile-left-info">
                  <p>{info.name}</p>
                  <p>{info.birthday}</p>
                </div>
              )}
            </div>
            <div className="profile-btn">
              {isEditInfo && (
                <span
                  className="profile-cancel-edit"
                  onClick={() => setIsEditInfo(false)}
                >
                  キャンセル
                </span>
              )}
              <button onClick={handleEditInfo}>
                {isEditInfo ? <SaveOutlined /> : <EditOutlined />}
                <span className="profile-btn-text">編集</span>
              </button>
            </div>
          </div>
          <div className="profile-right bg-item">
            <p className="profile-right-title">詳細</p>
            <div className="profile-right-item">
              <label htmlFor="">電子メールアドレス</label>
              <div className="profile-right-input">
                <input
                  type="text"
                  placeholder="example"
                  className="input-text"
                />
                <EditOutlined
                  className="profile-right-icon"
                  onClick={() => setIsEditEmail(true)}
                />
              </div>
            </div>
            <div className="profile-right-item">
              <label htmlFor="">パスワード</label>
              <div className="profile-right-input">
                <input
                  type="password"
                  placeholder="......"
                  className="input-text"
                />
                {!isEditPassword && (
                  <EditOutlined
                    className="profile-right-icon"
                    onClick={() => setIsEditPassword(true)}
                  />
                )}
              </div>
              {isEditPassword && (
                <div className="profile-right-input password">
                  <input
                    type="password"
                    placeholder="......"
                    className="input-text"
                  />
                  <input
                    type="password"
                    placeholder="......"
                    className="input-text"
                  />
                </div>
              )}
            </div>
            {(isEditPassword || isEditEmail) && (
              <div className="profile-btn profile-btn-right">
                <span
                  className="profile-cancel-edit"
                  onClick={() => {
                    setIsEditPassword(false);
                    setIsEditEmail(false);
                  }}
                >
                  キャンセル
                </span>
                <button onClick={handleEditAccount}>
                  {isEditInfo ? <SaveOutlined /> : <EditOutlined />}
                  <span className="profile-btn-text">編集</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
