import React from 'react'
import ReactLoading from "react-loading";
export default function LoadingComp() {
    return (
      <div className="loading-comp">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#FA8C16"}
          height={50}
          width={50}
          className="loading-icon"
        />
      </div>
    )
  }
