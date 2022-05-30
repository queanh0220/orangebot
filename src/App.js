import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Page/Login/Login";
import Home from "./Page/Home/Home";
import Profile from "./Page/Profile/Profile";
import Upload from "./Page/Upload/Upload";
import ChatboxSetting from "./Page/ChatboxSetting/ChatboxSetting";
import Marketing from "./Page/Marketing/Marketing";
import Scenario from "./Page/Scenario/Scenario";
import AgScenario from "./Page/Aggregation/Scenario/AgScenario";
import Dialogue from "./Page/Aggregation/Dialogue/Dialogue";
import Graph from "./Page/Aggregation/Graph/Graph";
import GraphTable from "./Page/Aggregation/Graph/GraphTable/GraphTable";
import GraphBar from "./Page/Aggregation/Graph/GraphBar/GraphBar";
import GraphLine from "./Page/Aggregation/Graph/GraphLine/GraphLine";
import GraphColum from "./Page/Aggregation/Graph/GraphColumn/GraphColum";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import withAuth from "./HOC/ProtectedRoutes"
import AuthContext from "./ContextApi/auth-context";

function App() {
  const queryClient = new QueryClient();
  const [authenticated, setauthenticated] = useState(localStorage.getItem("token"));
  const login = () => {
    console.log(authenticated)
    setauthenticated(true);
  };
  const logout = () => {
    localStorage.setItem("token", "");
    setauthenticated(false);
  }
  const HomeWithAuth = withAuth(Home)
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ status: authenticated, login: login, logout: logout }}>
      <div className="app">
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/home" element={<HomeWithAuth/>}>
              <Route path="profile" element={<Profile />} />
              <Route path="upload" element={<Upload />} />
              <Route path="chatbox-setting" element={<ChatboxSetting />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="scenario" element={<Scenario />} />
              <Route path="aggregation/scenario" element={<AgScenario />} />
              <Route path="aggregation/dialogue" element={<Dialogue />} />
              <Route path="aggregation/graph" element={<Graph />}>
                <Route path="table" element={<GraphTable />} />
                <Route path="bar" element={<GraphBar />} />
                <Route path="line" element={<GraphLine />} />
                <Route path="column" element={<GraphColum />} />
                <Route path="*" element={<GraphBar />} />
              </Route>
              <Route path="*" element={<Scenario />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
