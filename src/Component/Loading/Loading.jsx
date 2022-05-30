import React, { useContext } from "react";
import ReactLoading from "react-loading";
import "./Loading.css";
export default function Loading(props) {
  return props.loading ? (
    <div className="loading-component">
      <ReactLoading
        type={"spin"}
        color={"gray"}
        height={50}
        width={50}
        className="loading-icon"
      />
    </div>
  ) : null;
}
