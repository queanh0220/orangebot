import React, { useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Profile.css";
import person from "../../Svg/person.svg";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Profile() {
  const [editInfo, setEditInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
    img: "",
    email: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getInfo = () => {
    return axios
      .get(process.env.REACT_APP_API_URL + "users/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        
        const {_id, password, ...data} = res.data;
        setEditInfo({ ...editInfo, ...data });
        return { ...editInfo, ...data };
      })
      .catch((err) => {
        navigate("/");
        toast.error(err.message);
        console.log("err", err);
      });
  };

  const updateInfo = (data) => {
    console.log("update",data);
    return axios
      .put(process.env.REACT_APP_API_URL + "users/", data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        toast.success("update success!")
      });
  };

  const updatePassword = (data) => {
    return axios
      .put(process.env.REACT_APP_API_URL + "users/password/", data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        toast.success("update success!")
        setIsEditPassword(false);
      })
      .catch(err => {
        setErrPassword(err.response.data);
      })
  }

  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("get-profile", getInfo, {
    initialData: {},
  });
  const mutation = useMutation(updateInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-profile");
    },
  });
  const mutationPassword = useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-profile");
    },
  });

  const handleEditInfo = () => {
    mutation.mutate(editInfo);
    setIsEditInfo(false);
  };

  const checkpassword = () => {
  
    if (newPassword !== cfPassword) {
      setErrPassword("new password and confirm password do not match!");
      return false;
    }
    return true;
  };

  const handleEditAccount = () => {
    if (isEditPassword) {
      if (checkpassword()) {
        mutationPassword.mutate({oldPassword, newPassword});
      }
    } else {
      mutation.mutate(editInfo);
    }

    setIsEditEmail(false);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div className="profile">
      <Topbar icon={person} title="プロファイル" />
      <div className="main">
        <div className="profile-content">
          <div className="profile-left bg-item">
            <UpImg
              className="profile-left-img"
              img={data.img}
              saveImg={(info) => {
                mutation.mutate(info);
              }}
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
                  <p>{data.name}</p>
                  <p> {data.birthday}</p>
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
                  readOnly={!isEditEmail}
                  value={editInfo.email}
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, email: e.target.value })
                  }
                />
                {!isEditEmail && (
                  <EditOutlined
                    className="profile-right-icon"
                    onClick={() => setIsEditEmail(true)}
                  />
                )}
              </div>
            </div>
            <div className="profile-right-item">
              <label htmlFor="">パスワード</label>
              <div className="profile-right-input">
                <input
                  type="password"
                  placeholder="......"
                  className="input-text"
                  readOnly={!isEditPassword}
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value)
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="......"
                    className="input-text"
                    value={cfPassword}
                    onChange={(e) => setCfPassword(e.target.value)}
                  />
                </div>
              )}
            </div>
            {(isEditPassword || isEditEmail) && (
              <div className="profile-btn profile-btn-right">
                <span className="input-err">{errPassword}</span>
                <div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
