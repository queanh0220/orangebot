import React from "react";

const AuthContext = React.createContext({status: false, login: ()=>{}, logout:()=>{}});

export const LoadingContext = React.createContext({loading: false, setLoading:()=>{}})

export default AuthContext;
