import React from 'react'

export default function LoadingComp(props) {
    return props.loading ? (
      <div className="loading-component">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#FA8C16"}
          height={50}
          width={50}
          className="loading-icon"
        />
      </div>
    ) : null;
  }
