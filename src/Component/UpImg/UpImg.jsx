import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UpImg.css";
export default function UpImg(props) {
  const [img, setImg] = useState(
    props.img ??
      "https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg"
  );

  const handleImg = (e) => {
    e.preventDefault();
    console.log("img", e.target.files);
    if (e.target.files[0]) {
      props.setImgFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImg(reader.result);
          !!props.setImg && props.setImg(reader.result)
        }
      };
    }
  };

  useEffect(()=> {
    setImg(props.img)
  },[props.img])

  return (
    <div className={"up-img " + props.className}>
      {img ? (
        <>
          <img src={img} alt="" />
          <label htmlFor="upload-img">
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 0C11.7013 0 12 0.298667 12 0.666667V1.838L10.6667 3.17133V1.33333H1.33333V6.73333L4 4.06667L6.88533 6.95267L5.942 7.89467L4 5.95333L1.33333 8.61933V10.6667H8.35533L8.82733 10.6673L9.71333 9.78067L10.6 10.6667H10.6667V8.828L12 7.49467V11.3333C12 11.7013 11.7013 12 11.3333 12H0.666667C0.3 12 0 11.7 0 11.3333V0.666667C0 0.298667 0.298667 0 0.666667 0H11.3333ZM12.5187 3.20533L13.4613 4.148L8.276 9.33333L7.332 9.332L7.33333 8.39067L12.5187 3.20533ZM8.33333 2.66667C8.88533 2.66667 9.33333 3.11467 9.33333 3.66667C9.33333 4.21867 8.88533 4.66667 8.33333 4.66667C7.78133 4.66667 7.33333 4.21867 7.33333 3.66667C7.33333 3.11467 7.78133 2.66667 8.33333 2.66667Z"
                fill="white"
              />
            </svg>
          </label>
        </>
      ) : (
        <label htmlFor="upload-img" className="up-img-labeladd">
          <svg
            width="30"
            height="27"
            viewBox="0 0 30 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.0003 16V20H30.0003V22.6667H26.0003V26.6667H23.3337V22.6667H19.3337V20H23.3337V16H26.0003ZM26.011 0C26.7417 0 27.3337 0.593333 27.3337 1.324V13.7893C26.4772 13.4868 25.5753 13.3326 24.667 13.3333V2.66667H3.33366L3.33499 21.3333L15.7243 8.94267C15.9536 8.71264 16.259 8.57431 16.5831 8.55368C16.9073 8.53306 17.2277 8.63156 17.4843 8.83067L17.6083 8.944L22.3363 13.6773C21.3025 13.9924 20.3432 14.5135 19.5163 15.2093C18.6893 15.9051 18.0118 16.7611 17.5247 17.7259C17.0375 18.6906 16.7508 19.744 16.6817 20.8225C16.6127 21.901 16.7628 22.9824 17.123 24.0013L1.98966 24C1.63874 23.9996 1.30232 23.86 1.05431 23.6117C0.806302 23.3635 0.666992 23.0269 0.666992 22.676V1.324C0.669432 0.973838 0.809526 0.63869 1.05701 0.390957C1.30449 0.143224 1.6395 0.00279287 1.98966 0H26.011ZM8.66699 5.33333C9.37424 5.33333 10.0525 5.61428 10.5526 6.11438C11.0527 6.61448 11.3337 7.29276 11.3337 8C11.3337 8.70724 11.0527 9.38552 10.5526 9.88562C10.0525 10.3857 9.37424 10.6667 8.66699 10.6667C7.95975 10.6667 7.28147 10.3857 6.78137 9.88562C6.28128 9.38552 6.00033 8.70724 6.00033 8C6.00033 7.29276 6.28128 6.61448 6.78137 6.11438C7.28147 5.61428 7.95975 5.33333 8.66699 5.33333V5.33333Z"
              fill="white"
            />
          </svg>
        </label>
      )}
      <input
        type="file"
        id="upload-img"
        style={{ display: "none" }}
        onChange={handleImg}
      />
    </div>
  );
}
