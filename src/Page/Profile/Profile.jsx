import React, { useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Profile.css";
import person from "../../Svg/person.svg";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
export default function Profile() {

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

  const getInfo = () => {
    return axios
      .get("http://localhost:4000/users/" + userId)
      .then((res) => {
        console.log(res.data)
        setEditInfo({ ...editInfo, ...res.data });
        return { ...editInfo, ...res.data };
      })
    
  };

  const updateInfo = (data) => {
    console.log(data)
    return axios
      .put("http://localhost:4000/users/" + userId, data)
      .then((res) => {
        console.log(res);
      })
  };

  const queryClient = useQueryClient();
  const {data, isSuccess} = useQuery('get-profile', getInfo, {initialData: editInfo})
  const mutation = useMutation(updateInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-profile');
    }
  })

  const handleEditInfo = () => {
    mutation.mutate(editInfo);
    setIsEditInfo(false);
  };

  const handleEditAccount = () => {
    mutation.mutate(editInfo);
    setIsEditPassword(false);
    setIsEditEmail(false);
  };

  useEffect(() => {
    console.log("data",data)
  },[data])
  return (
    <div className="profile">
      <Topbar icon={person} title="プロファイル" />
      <div className="main">
        <div className="profile-content">
          <div className="profile-left bg-item">
            <UpImg
              className="profile-left-img"
              img={isSuccess ? data.img : ""}
              saveImg={(info)=>{mutation.mutate(info)}}
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
                  <p>{ data.name }</p>
                  <p> {data.birthday }</p>
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
