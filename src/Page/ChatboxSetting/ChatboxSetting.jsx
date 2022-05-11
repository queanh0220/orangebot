import React, { useState } from "react";
import "./ChatboxSetting.css";
import icon from "../../Svg/chatboxsetting.svg";
import Topbar from "../../Component/Topbar/Topbar";
import iconButton from "../../Svg/chatbox/tag.svg";
import sendicon from "../../Svg/chatbox/send.svg";
import { CopyOutlined, MinusOutlined, SaveOutlined, SendOutlined, SettingOutlined } from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
export default function ChatboxSetting() {
  const [img, setImg] = useState(
    "https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg"
  );

  const url = '<script src="https://localhost:8443/chatbot/forLP.js" charset="UTF-8" tenant-id="cc88883ebffbe99bfda924c637edd315" url-page-counter="google.com"></script>'

  return (
    <div className="chatboxSetting">
      <Topbar icon={icon} title="チャットボットUIの設定" />
      <div className="main">
        <div className="chatboxSetting-content">
          <div className="chatboxSetting-left">
            <div className="chatboxSetting-title bg-item">
              <div className="chatboxSetting-head">
                <h2>ヘッダ</h2>
                <div className="chatboxSetting-head-right">
                  <span>背景</span>
                  <button>
                    <img src={iconButton} alt="" />
                  </button>
                  <span>アイコン</span>
                  <button>
                    <img src={iconButton} alt="" />
                  </button>
                </div>
              </div>
              <div className="chatboxSetting-title-content">
                <UpImg className="chatboxSetting-img" />

                <div className="chatboxSetting-box-content">
                  <p>文書</p>
                  <div className="chatboxSetting-input">
                    <input type="text" className="input-text" placeholder="チャットボット"/>
                    <select name="" id="">
                      <option value="14">14</option>
                    </select>
                    <button>
                      <img src={iconButton} alt="" />
                    </button>
                  </div>
                  <div className="chatboxSetting-input">
                    <input type="text" className="input-text" placeholder="24時間受け付けてます！"/>
                    <select name="" id="">
                      <option value="14">14</option>
                    </select>
                    <button>
                      <img src={iconButton} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="chatboxSetting-chatbox bg-item">
              <div className="chatboxSetting-head">
                <h2>チャットボックス</h2>
                <div className="chatboxSetting-head-right">
                  <span>背景</span>
                  <button>
                    <img src={iconButton} alt="" />
                  </button>
                </div>
              </div>
              <div className="chatboxSetting-chatbox-content">
                <div className="chatboxSetting-box-content">
                  <p>本文</p>
                  <div className="chatboxSetting-input">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="お問い合わせ内容を入力していただくか、以下から選んでください。"
                    />
                    <select name="" id="">
                      <option value="14">14</option>
                    </select>
                    <button>
                      <img src={iconButton} alt="" />
                    </button>
                  </div>
                </div>
                <div className="chatboxSetting-box-content">
                  <p>シナリオ</p>
                  <div className="chatboxSetting-input">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="お問い合わせ内容を入力していただくか、以下から選んでください。"
                    />
                    <select name="" id="">
                      <option value="14">14</option>
                    </select>
                    <button>
                      <img src={iconButton} alt="" />
                    </button>
                  </div>
                </div>
                <div className="chatboxSetting-box-content">
                  <p>入力欄</p>
                  <div className="chatboxSetting-input">
                    <input
                      type="text"
                      className="input-text"
                      placeholder="お問い合わせ内容を入力ください"
                    />
                    <select name="" id="">
                      <option value="14">14</option>
                    </select>
                    <button>
                      <img src={iconButton} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chatboxSetting-right">
            <div className="chatboxSetting-right-head">
              <img src={img} alt="" />
              <div className="chatboxSetting-right-text">
                <h3>チャットボット</h3>
                <p>24時間受け付けてます！</p>
              </div>
              <button>
                <MinusOutlined />
              </button>
            </div>
            <div className="chatboxSetting-right-content"></div>
            <div className="chatboxSetting-right-foot">
              <input type="text" className="input-text" placeholder="お問い合わせ内容を入力ください。"/>
              <img
                src={sendicon}
                alt=""
                className="chatboxSetting-right-icon"
              />
            </div>
          </div>
          <div className="chatboxSetting-bottom bg-item">
              <h2>チャットボックス</h2>
              <p>{"チャットボットを表示したいページの</body>タグの前に以下のHTMLを埋め込んでください。"}</p>
                <div className="chatboxSetting-bottom-input">
                    <input type="text" className="input-text" value={url}/>
                    <button className="button"><CopyOutlined/></button>
                </div>
          </div>
          <div className="chatboxSetting-buttons">
              <button className="chatboxSetting-setting-btn button">
                  <SettingOutlined />
                  <p>デフォルトに戻す</p>
              </button>
              <span className="chatboxSetting-cancel-btn">元に戻す</span>
              <button className="chatboxSetting-save-btn button">
                  <SaveOutlined />
                  <p>保存する</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
