
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Page/Login/Login';
import Home from './Page/Home/Home';
import Profile from './Page/Profile/Profile';
import Upload from './Page/Upload/Upload';
import ChatboxSetting from './Page/ChatboxSetting/ChatboxSetting';
import Marketing from './Page/Marketing/Marketing';
import Scenario from './Page/Scenario/Scenario';
import  AgScenario from './Page/Aggregation/Scenario/AgScenario';
import Dialogue from './Page/Aggregation/Dialogue/Dialogue';
import Graph from './Page/Aggregation/Graph/Graph';
import GraphTable from './Page/Aggregation/Graph/GraphTable/GraphTable';
import GraphBar from './Page/Aggregation/Graph/GraphBar/GraphBar';


function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} >
            <Route path='profile' element={<Profile />} />
            <Route path='upload' element={<Upload />} />
            <Route path='chatbox-setting' element={<ChatboxSetting />} />
            <Route path='marketing' element={<Marketing />} />
            <Route path='scenario' element={<Scenario />} />
            <Route path='aggregation/scenario' element={<AgScenario />} />
            <Route path='aggregation/dialogue' element={<Dialogue/>} />
            <Route path='aggregation/graph' element={<Graph/>} >
              <Route path='table' element={<GraphTable />} />
              <Route path='bar' element={<GraphBar />} />
              <Route path='*' element={<GraphBar />} />
            </Route>
            <Route path='*' element={<Scenario />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
