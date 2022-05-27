import React, { useEffect, useState } from "react";
import "./ChatboxSetting.css";
import icon from "../../Svg/chatboxsetting.svg";
import Topbar from "../../Component/Topbar/Topbar";
import iconButton from "../../Svg/chatbox/tag.svg";
import sendicon from "../../Svg/chatbox/send.svg";
import {
  CopyOutlined,
  MinusOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import UpImg from "../../Component/UpImg/UpImg";
import ChatboxButton from "./ChatboxButton/ChatboxButton";
import ChatboxInput from "./ChatboxInput/ChatboxInput";
import axios from "axios";
import { toast } from "react-toastify";
import { chatboxDefault } from "../../data";
import { uploadFile } from "../../Api/uploadFile";
export default function ChatboxSetting() {

  const [imgFile, setImgFile] = useState('');

  const [chatbox, setChatbox] = useState(chatboxDefault);

  const url = '<script src="https://localhost:8443/chatbot/forLP.js" charset="UTF-8" tenant-id="cc88883ebffbe99bfda924c637edd315" url-page-counter="google.com"></script>';
  const getData = () => {
    const token = localStorage.getItem('token')
    axios
      .get(process.env.REACT_APP_API_URL + "chatboxs/", {
        headers: { Authorization: token },
      })
      .then(res => {
        setChatbox({...chatbox, ...res.data})
      })
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const {_id, ...data} = chatbox;
    console.log(data);
    if(imgFile) {
      const upImg = await uploadFile(imgFile);
      data.img = upImg.data;
    }
    axios.put(process.env.REACT_APP_API_URL + "chatboxs/", data,  {
      headers: { Authorization: token },
    }).then(() => {
      toast.success("Update success");
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSetDefault = () => {
    setChatbox(chatboxDefault);
  }

  useEffect(() => {
    getData()
  },[])

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
                    color={chatbox.headBgColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, headBgColor: color };
                      });
                    }}
                  />

                  <span>アイコン</span>
                  <ChatboxButton
                    color={chatbox.iconColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, iconColor: color };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="chatboxSetting-title-content">
                <UpImg className="chatboxSetting-img" img={chatbox.img} setImgFile={setImgFile}/>

                <div className="chatboxSetting-box-content">
                  <p>文書</p>
                  <ChatboxInput
                    text={chatbox.title}
                    setText={(e) =>
                      setChatbox((pre) => {
                        return { ...pre, title: e.target.value };
                      })
                    }
                    color={chatbox.titleColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, titleColor: color };
                      });
                    }}
                    placeholder="チャットボット"
                  />

                  <ChatboxInput
                    text={chatbox.headText}
                    setText={(e) =>
                      setChatbox((pre) => {
                        return { ...pre, headText: e.target.value };
                      })
                    }
                    color={chatbox.headTextColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, headTextColor: color };
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
                    color={chatbox.bodyBgColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, bodyBgColor: color };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="chatboxSetting-chatbox-content">
                <div className="chatboxSetting-box-content">
                  <p>本文</p>
                  <ChatboxInput
                    text={chatbox.bodyText}
                    setText={(e) =>
                      setChatbox((pre) => {
                        return { ...pre, bodyText: e.target.value };
                      })
                    }
                    color={chatbox.bodyTextColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, bodyTextColor: color };
                      });
                    }}
                    placeholder="お問い合わせ内容を入力していただくか、以下から選んでください"
                  />
                </div>
                <div className="chatboxSetting-box-content">
                  <p>シナリオ</p>
                  <ChatboxInput
                    text={chatbox.scenario}
                    setText={(e) =>
                      setChatbox((pre) => {
                        return { ...pre, scenario: e.target.value };
                      })
                    }
                    color={chatbox.sceniarioColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
                        return { ...pre, sceniarioColor: color };
                      });
                    }}
                    placeholder="お問い合わせ内容を入力していただくか、以下から選んでください。"
                  />
                </div>
                <div className="chatboxSetting-box-content">
                  <p>入力欄</p>
                  <ChatboxInput
                    text={chatbox.input}
                    setText={(e) =>
                      setChatbox((pre) => {
                        return { ...pre, input: e.target.value };
                      })
                    }
                    color={chatbox.inputColor}
                    setColor={(color) => {
                      setChatbox((pre) => {
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
            <div
              className="chatboxSetting-right-head"
              style={{ background: chatbox.headBgColor }}
            >
              <img src={chatbox.img} alt="" />
              <div className="chatboxSetting-right-text">
                <h3 style={{ color: chatbox.titleColor }}>{chatbox.title}</h3>
                <p style={{ color: chatbox.headTextColor }}>{chatbox.headText}</p>
              </div>
              <button>
                <MinusOutlined style={{ color: chatbox.iconColor }} />
              </button>
            </div>
            <div
              className="chatboxSetting-right-content"
              style={{ background: chatbox.bodyBgColor }}
            ></div>
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
            <button className="chatboxSetting-setting-btn button" onClick={handleSetDefault}>
              <SettingOutlined />
              <p>デフォルトに戻す</p>
            </button>
            <span className="chatboxSetting-cancel-btn">元に戻す</span>
            <button className="chatboxSetting-save-btn button" onClick={handleSave}>
              <SaveOutlined />
              <p>保存する</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
