import React, { useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Profile.css";
import person from "../../Svg/person.svg";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import axios from "axios";
export default function Profile() {
  const [info, setInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
    img: "",
    email: "",
    password: "",
  });
  const [editInfo, setEditInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
    img: "",
    email: "",
    password: "",
  });
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const userId = localStorage.getItem("userid");

  const updateInfo = (data) => {
    console.log(data)
    axios
      .put("http://localhost:4000/users/" + userId, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditInfo = () => {
    updateInfo(editInfo)
    setInfo(editInfo);
    setIsEditInfo(false);
  };

  const handleEditAccount = () => {
    updateInfo(editInfo);
    setInfo(editInfo);
    setIsEditPassword(false);
    setIsEditEmail(false);
  };

  const getInfo = () => {
    axios
      .get("http://localhost:4000/users/" + userId)
      .then((res) => {
        console.log(res.data)
        setInfo({ ...info, ...res.data });
        setEditInfo({ ...info, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="profile">
      <Topbar icon={person} title="プロファイル" />
      <div className="main">
        <div className="profile-content">
          <div className="profile-left bg-item">
            <UpImg
              className="profile-left-img"
              img={info.img}
              saveImg={updateInfo}
            />

            <div className="profile-left-text">
              {isEditInfo ? (
                <div className="profile-left-edit">
                  <input
                    type="text"
                    placeholder="本田 圭佑"
                    className="input-text"
                    value={editInfo.name}
                    onChange={(e) =>
                      setEditInfo({ ...editInfo, name: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="input-text"
                    value={editInfo.birthday}
                    onChange={(e) =>
                      setEditInfo({ ...editInfo, birthday: e.target.value })
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
              {isEditInfo ? (
                <button onClick={handleEditInfo}>
                  <SaveOutlined />
                  <span className="profile-btn-text">編集</span>
                </button>
              ) : (
                <button onClick={() => setIsEditInfo(true)}>
                  <EditOutlined />
                  <span className="profile-btn-text">編集</span>
                </button>
              )}
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
                  value={editInfo.email}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, email: e.target.value })
                  }
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
                  value={editInfo.password}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, password: e.target.value })
                  }
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
                    <SaveOutlined />
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
