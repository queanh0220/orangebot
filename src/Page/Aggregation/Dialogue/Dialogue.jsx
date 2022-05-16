import React from 'react'
import  "./Dialogue.css"
import Topbar from '../../../Component/Topbar/Topbar'
import icon from "../../../Svg/dialog.svg"
export default function Dialogue() {
  return (
    <div className='dialogue'>
        <Topbar icon={icon} title="集計 / 対話履歴" />
    </div>
  )
}
