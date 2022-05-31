import React from "react";

export const AuthContext = React.createContext({status: false, login: ()=>{}, logout:()=>{}});

export const LoadingContext = React.createContext({loading: false, setLoading:()=>{}})

