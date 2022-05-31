import React, { useState } from "react";
import Loading from "../Component/Loading/Loading";
import { LoadingContext } from "./context-api";

export default function LoadingContextComp(props) {
    const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{ setLoading: (value) => setLoading(value) }}
    >
        <Loading loading={loading}/>
        {props.children}
    </LoadingContext.Provider>
  );
}
