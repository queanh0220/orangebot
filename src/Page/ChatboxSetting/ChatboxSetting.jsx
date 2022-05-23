import React, { useState } from "react";
import "./ChatboxSetting.css";
import icon from "../../Svg/chatboxsetting.svg";
import Topbar from "../../Component/Topbar/Topbar";
import iconButton from "../../Svg/chatbox/tag.svg";
import sendicon from "../../Svg/chatbox/send.svg";
import {
  CopyOutlined,
  MinusOutlined,
  SaveOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import ColorPicker from "../../Component/ColorPicker/ColorPicker";
import ChatboxButton from "./ChatboxButton/ChatboxButton";
import ChatboxInput from "./ChatboxInput/ChatboxInput";
export default function ChatboxSetting() {
  const [img, setImg] = useState(
    "https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg"
  );
  const [header, setHeader] = useState({
    img: "",
    backgroundColor: "#025967",
    iconColor: "#ffffff",
    title: "チャットボット",
    text: "24時間受け付けてます！",
    titleSize: 14,
    textSize: 14,
    titleColor: "#ffffff",
    textColor: "#ffffff",
  });
  const [body, setBody] = useState({
    backgroundColor: "#D9D9D9",
    text: "",
    scenario: "",
    input: "",
    textColor: "#ffffff",
    sceniarioColor: "#ffffff",
    inputColor: "#ffffff",
    textSize: 14,
    scenarioSize: 14,
    inputSize: 14,
  });

  const url =
    '<script src="https://localhost:8443/chatbot/forLP.js" charset="UTF-8" tenant-id="cc88883ebffbe99bfda924c637edd315" url-page-counter="google.com"></script>';

  const regColor = /^#([d-f][a-fA-F0-9]){3}$/;
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
                  <ChatboxButton
                    color={header.backgroundColor}
                    setColor={(color) => {
                      setHeader((pre) => {
                        return { ...pre, backgroundColor: color };
                      });
                    }}
                  />

                  <span>アイコン</span>
                  <ChatboxButton
                    color={header.iconColor}
                    setColor={(color) => {
                      setHeader((pre) => {
                        return { ...pre, iconColor: color };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="chatboxSetting-title-content">
                <UpImg className="chatboxSetting-img" />

                <div className="chatboxSetting-box-content">
                  <p>文書</p>
                  <ChatboxInput
                    text={header.title}
                    setText={(e) =>
                      setHeader((pre) => {
                        return { ...pre, title: e.target.value };
                      })
                    }
                    color={header.titleColor}
                    setColor={(color) => {
                      setHeader((pre) => {
                        return { ...pre, titleColor: color };
                      });
                    }}
                    placeholder="チャットボット"
                  />

                  <ChatboxInput
                    text={header.text}
                    setText={(e) =>
                      setHeader((pre) => {
                        return { ...pre, text: e.target.value };
                      })
                    }
                    color={header.textColor}
                    setColor={(color) => {
                      setHeader((pre) => {
                        return { ...pre, textColor: color };
                      });
                    }}
                    placeholder="24時間受け付けてます！"
                  />
                </div>
              </div>
            </div>
            <div className="chatboxSetting-chatbox bg-item">
              <div className="chatboxSetting-head">
                <h2>チャットボックス</h2>
                <div className="chatboxSetting-head-right">
                  <span>背景</span>
                  <ChatboxButton
                    color={body.backgroundColor}
                    setColor={(color) => {
                      setBody((pre) => {
                        return { ...pre, backgroundColor: color };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="chatboxSetting-chatbox-content">
                <div className="chatboxSetting-box-content">
                  <p>本文</p>
                  <ChatboxInput
                    text={body.text}
                    setText={(e) =>
                      setBody((pre) => {
                        return { ...pre, text: e.target.value };
                      })
                    }
                    color={body.textColor}
                    setColor={(color) => {
                      setBody((pre) => {
                        return { ...pre, textColor: color };
                      });
                    }}
                    placeholder="お問い合わせ内容を入力していただくか、以下から選んでください"
                  />
                </div>
                <div className="chatboxSetting-box-content">
                  <p>シナリオ</p>
                  <ChatboxInput
                    text={body.scenario}
                    setText={(e) =>
                      setBody((pre) => {
                        return { ...pre, scenario: e.target.value };
                      })
                    }
                    color={body.sceniarioColor}
                    setColor={(color) => {
                      setBody((pre) => {
                        return { ...pre, sceniarioColor: color };
                      });
                    }}
                    placeholder="お問い合わせ内容を入力していただくか、以下から選んでください。"
                  />
                </div>
                <div className="chatboxSetting-box-content">
                  <p>入力欄</p>
                  <ChatboxInput
                    text={body.input}
                    setText={(e) =>
                      setBody((pre) => {
                        return { ...pre, scenario: e.target.value };
                      })
                    }
                    color={body.inputColor}
                    setColor={(color) => {
                      setBody((pre) => {
                        return { ...pre, inputColor: color };
                      });
                    }}
                    placeholder="お問い合わせ内容を入力ください"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="chatboxSetting-right">
            <div className="chatboxSetting-right-head" style={{background: header.backgroundColor}}>
              <img src={img} alt="" />
              <div className="chatboxSetting-right-text">
                <h3 style={{color: header.titleColor}}>{header.title}</h3>
                <p style={{color: header.textColor}}>{header.text}</p>
              </div>
              <button>
                <MinusOutlined style={{color: header.iconColor}}/>
              </button>
            </div>
            <div className="chatboxSetting-right-content" style={{background: body.backgroundColor}}></div>
            <div className="chatboxSetting-right-foot">
              <input
                type="text"
                className="input-text"
                placeholder="お問い合わせ内容を入力ください。"
              />
              <img
                src={sendicon}
                alt=""
                className="chatboxSetting-right-icon"
              />
            </div>
          </div>
          <div className="chatboxSetting-bottom bg-item">
            <h2>チャットボックス</h2>
            <p>
              {
                "チャットボットを表示したいページの</body>タグの前に以下のHTMLを埋め込んでください。"
              }
            </p>
            <div className="chatboxSetting-bottom-input">
              <input type="text" className="input-text" value={url} />
              <button className="button">
                <CopyOutlined />
              </button>
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
