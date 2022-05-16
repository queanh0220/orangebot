import React from 'react'
import Topbar from '../../../Component/Topbar/Topbar'
import './Graph.css'
import icon from "../../../Svg/graph.svg"
import { DatePicker } from "antd";
import { Link, Outlet, useLocation } from 'react-router-dom';
export default function Graph() {
  const { RangePicker } = DatePicker;
  const location = useLocation().pathname;
  const links = ["/home/aggregation/graph/table", "/home/aggregation/graph/bar", "/home/aggregation/graph/line", "/home/aggregation/graph/column"]
  return (
    <div className='graph'>
        <Topbar icon={icon} title='集計 / グラフ'/>
        <div className="main">
          <div className="graph-content">
            <div className="graph-top">
              <div className="graph-nav">
                <Link to={links[0]} className={'graph-link '+(location === links[0] ? "active": "")}>添付ファイル</Link>
                <Link to={links[1]} className={'graph-link '+(location === links[1] ? "active": "")}>シナリオ</Link>
                <Link to={links[2]} className={'graph-link '+(location === links[2] ? "active": "")}>アクセス数</Link>
                <Link to={links[3]} className={'graph-link '+(location === links[3] ? "active": "")}>開始数・離脱数</Link>
              </div>
              <div className="graph-date">
                  <label htmlFor="">期間</label>
                  <RangePicker />
              </div>
            </div>         
              <Outlet />
          </div>
        </div>
    </div>
  )
}
