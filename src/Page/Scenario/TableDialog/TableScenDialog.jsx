import { CloseCircleOutlined, DeleteFilled, PlusCircleFilled } from '@ant-design/icons'
import React from 'react'
import "./TableDialog.css"
export default function TableScenDialog() {
  return (
    <table className='dialog-table'>
  <tr>
    <th>No</th>
    <th>メッセージ</th>
    <th>コントロール</th>
    <th>項目名</th>
    <th>CV地点</th>
  </tr>
  <tr>
  <td rowspan="3">01</td>
    <td rowspan="3" className='table-mess'>
      <input type="text" />
    </td>
    <td><select name="" id="">
      <option value="">Option</option>
      <option value="">Datapicker</option>
      </select></td>
    <td><input type="text" placeholder='キャンペーン'/></td>
    <td rowspan="3">
      <input type="radio" />
      <PlusCircleFilled />
      <DeleteFilled />
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <label htmlFor="">オプション1</label>
      <div className="table-input">
        <input type="text" placeholder='キャンペーン'/>
        <CloseCircleOutlined />
      </div>
      <PlusCircleFilled />
    </td>
  </tr>
  <tr>
    <td colspan="2">16</td>
  </tr>
  <tr>
  <td rowspan="3">1</td>
    <td rowspan="3">Emil</td>
    <td>Tobias</td>
    <td>Linus</td>
    <td rowspan="3">Linus</td>
  </tr>
  <tr>
    <td colspan="2">16</td>
  </tr>
  <tr>
    <td colspan="2">16</td>
  </tr>
  
</table>
  )
}
