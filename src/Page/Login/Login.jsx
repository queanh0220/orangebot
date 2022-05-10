import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../Component/Logo/Logo";
export default function Login() {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home/profile");
    }
  return (
    <div className="login">
        <Logo className="login-logo"/>
      <form className="login-form" action="#" method="POST">
        <h2>ログイン</h2>
        <div className="login-text">
          <label htmlFor="">ユーザー名</label>
          <Input
            type="text"
            size="large"
            placeholder="ユーザー名を入力してください。"
            prefix={<UserOutlined style={{ color: "#1890FF" }} />}
          />
        </div>
        <div className="login-text">
          <label htmlFor="">パスワード</label>
          <Input
            type="text"
            size="large"
            placeholder="パースワードを入力してください。"
            prefix={<LockOutlined style={{ color: "#1890FF" }} />}
          />
        </div>
        <div className="login-option">
          <div className="login-checkbox">
            <input type="checkbox" id="save-pass" />
            <label htmlFor="save-pass">パースワードを保存</label>
          </div>
          <p className="login-fogot-pasword">パスワードをお忘れですか？ </p>
        </div>
        <input type="submit" value={"サインイン"} className="login-submit" onClick={handleSubmit}/>
      </form>
    </div>
  );
}
