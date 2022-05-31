import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState, useLayoutEffect, useRef, useEffect, useContext } from "react";
import "./Login.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Component/Logo/Logo";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext, LoadingContext } from "../../ContextApi/context-api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const loading = useContext(LoadingContext);
  const search = useLocation().search;
  const [err, setErr] = useState((new URLSearchParams(search)).get('error'));
  const auth = useContext(AuthContext)
  console.log(auth.status);
  const checknull = () => {
    let ck = false;
    if (!username) {
      console.log("aaaa");
      setErrUsername("ユーザー名が必要です!");
      ck = true;
    }
    if (!password) {
      setErrPassword("パスワードが必要です!");
      ck = true;
    }
    return ck;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (checknull()) return;
    loading.setLoading(true);
    await axios
      .post(process.env.REACT_APP_API_URL+"users/login", { username, password })
      .then((res) => {
        console.log("login", auth.status)
        localStorage.setItem("token", res.headers.token);
        auth.login();
        toast.success("Login success")
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data === "wrong password") {
          setErrPassword("パスワードが正しくありません!");
        } else {
          setErrUsername("ユーザー名が正しくありません!");
        }
        console.log("err", err.response.data);
      });
    loading.setLoading(false);
  };

  useEffect(()=>{
    console.log(err);
    if(err) {
      toast.error(err);
      setErr("");
    }
  },[])
  if(auth.status) {
    return <Navigate to="/home/profile" replace />
  }
  return (
    <div className="login">
      <Logo className="login-logo" show={true} />
      <form className="login-form" action="#" method="POST">
        <h2>ログイン</h2>
        <div className="login-text">
          <label htmlFor="">ユーザー名</label>
          <Input
            type="text"
            size="large"
            placeholder="ユーザー名を入力してください。"
            value={username}
            required={true}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrUsername("");
            }}
            prefix={<UserOutlined style={{ color: "#1890FF" }} />}
          />
          <span className="input-err">{errUsername}</span>
        </div>
        <div className="login-text">
          <label htmlFor="">パスワード</label>
          <Input
            type="password"
            size="large"
            required={true}
            placeholder="パースワードを入力してください。"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("");
            }}
            prefix={<LockOutlined style={{ color: "#1890FF" }} />}
          />
          <span className="input-err">{errPassword}</span>
        </div>
        <div className="login-option">
          <div className="login-checkbox">
            <input type="checkbox" id="save-pass" />
            <label htmlFor="save-pass">パースワードを保存</label>
          </div>
          <p className="login-fogot-pasword">パスワードをお忘れですか？ </p>
        </div>
        <input
          type="submit"
          value={"サインイン"}
          className="login-submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
