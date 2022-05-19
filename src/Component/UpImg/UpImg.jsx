import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UpImg.css";
export default function UpImg(props) {
  const [img, setImg] = useState(
    "https://i.pinimg.com/originals/24/3f/e4/243fe4fa4293f1cb878d9dce142785a0.jpg"
  );

  const handleImg = (e) => {
    console.log("img",e.target.files)
    const formData = new FormData();
    if (e.target.files[0]) {
      formData.append("file", e.target.files[0]);
      axios
        .post("http://localhost:4000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          props.saveImg({ img: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (props.img) setImg(props.img);
  });

  return (
    <div className={"up-img " + props.className}>
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
      <input
        type="file"
        id="upload-img"
        style={{ display: "none" }}
        onChange={handleImg}
      />
    </div>
  );
}
