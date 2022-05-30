import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Profile.css";
import person from "../../Svg/person.svg";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosCustom from "../../Api/axiosCustom";
import { uploadFile } from "../../Api/uploadFile";
import Loading from "../../Component/Loading/Loading";
export default function Profile() {
  const [editInfo, setEditInfo] = useState({
    name: "本田 圭佑",
    birthday: "1985-06-13",
    img: "",
    email: "",
  });
  const [imgFile, setImgFile] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");


  const getInfo = () => {
    return axiosCustom
      .get("/users")
      .then((res) => {
        const { _id, password, ...data } = res.data;
        setEditInfo({ ...editInfo, ...data });
        return { ...editInfo, ...data };
      })
  };
  useEffect(() => {
    if(imgFile && !isEditInfo) {
      setIsEditInfo(true);
    }
  },[imgFile])
  const updateInfo = async (data) => {
    // loading.setLoading(true)
    setLoading(true)
    if (imgFile) {
      const imgRes = await uploadFile(imgFile, data.img);
      data.img = imgRes.data;
    }
    console.log("updateInfo", data);
    const result = await axios
    .put(process.env.REACT_APP_API_URL + "users/", data, {
      headers: { Authorization: token },
    })
    .then((res) => {
      toast.success("update success!");
    });
    setLoading(false)
    return result;
  };

  const updatePassword = (data) => {
    setLoading(true)
    return axios
      .put(process.env.REACT_APP_API_URL + "users/password/", data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        toast.success("update success!");
        setIsEditPassword(false);
        setLoading(false)
      })
      .catch((err) => {
        setErrPassword(err.response.data);
        setLoading(false)
      });
  };

  const queryClient = useQueryClient();

  const { data, isSuccess } = useQuery("get-profile", getInfo);

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
        mutationPassword.mutate({ oldPassword, newPassword });
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
      <Loading loading={loading}/>
      <Topbar icon={person} title="プロファイル" />
      <div className="main">
        <div className="profile-content">
          <div className="profile-left bg-item">
            <UpImg
              className="profile-left-img"
              img={isSuccess ? data.img:''}
              setImgFile={setImgFile}
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
                  <p>{isSuccess?data.name:""}</p>
                  <p> {isSuccess?data.birthday:""}</p>
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
                  onChange={(e) => setOldPassword(e.target.value)}
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
