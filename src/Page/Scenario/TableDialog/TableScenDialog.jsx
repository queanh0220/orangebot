import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "./TableDialog.css";
export default function TableScenDialog() {
  const [table, setTable] = useState([
    
  ]);

  const [curItem, setCurItem] = useState({
    message: "",
    options: {
      name: "",
      data: ["", ""],
    },
    name: "",
    cv: false,
  });

  const insertTable = (index) => {
    table.splice(index, 0, {
      message: "",
      options: { name: "", data: ["", ""] },
      name: "",
      cv: false,
    });
    console.log(table);
    setTable([...table]);
  };

  const insertOption = (item, index) => {
    item.options.data.splice(index, 0, "");
    setTable([...table]);
    setCurItem({...curItem});
  };

  const changeOption = (item, e) => {
    item.options.name = e.target.value;
    setTable([...table]);
  };

  const handleChangeMessage = (item, e) => {
    item.message = e.target.value;
    setTable([...table]);
  };

  const handleChangeName = (item, e) => {
    item.name = e.target.value;
    setTable([...table]);
  };

  const handleChangeTextOption = (item, index, e) => {
      item.options.data[index] = e.target.value;
      setTable([...table]);
  }

  const deleteTable = (index) => {
    table.splice(index, 1);
    setTable([...table]);
  };

  return (
    <table className="dialog-table">
      <tr>
        <th>No</th>
        <th>メッセージ</th>
        <th>コントロール</th>
        <th>項目名</th>
        <th>CV地点</th>
      </tr>
      {table.map((item, index) => {
        return (
          <>
            <tr>
              <td rowspan="2">01</td>
              <td rowspan="2" className="table-mess">
                <input
                  type="text"
                  placeholder="example"
                  value={item.message}
                  onChange={(e) => handleChangeMessage(item, e)}
                />
              </td>
              <td className={item.options.name ? "table-border-option" : ""}>
                <select
                  name=""
                  id=""
                  value={item.options.name}
                  onChange={(e) => changeOption(item, e)}
                >
                  <option style={{ display: "none" }} selected>
                    . . .
                  </option>
                  <option value="Option">Option</option>
                  <option value="Datapicker">Datapicker</option>
                </select>
              </td>
              <td
                className={
                  item.options.name
                    ? "table-border-option"
                    : "table-border-none"
                }
              >
                <input type="text" placeholder="キャンペーン" value={item.name}  onChange={(e) => handleChangeName(item, e)}/>
              </td>
              <td rowspan="2">
                <div className="table-CVpoint">
                  <input type="radio" className="table-radio" />
                  <PlusCircleFilled
                    style={{ color: "#52C41A" }}
                    onClick={() => insertTable(index + 1)}
                  />
                  <DeleteFilled
                    style={{ color: "#FF4D4F" }}
                    onClick={() => deleteTable(index)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              {item.options.name && (
                <td colspan="2" className="table-option-padding">
                  {item.options.data.map((option, index) => {
                    return (
                      <div className="table-option">
                        <label htmlFor="">オプション1</label>
                        <div className="table-input">
                          <input
                            type="text"
                            placeholder="キャンペーン"
                            value={option}
                            onChange={(e) => handleChangeTextOption(item, index, e)}
                          />
                          <CloseCircleFilled className="table-input-icon" />
                        </div>
                        <PlusCircleOutlined
                          style={{ color: "#52C41A" }}
                          onClick={() => insertOption(item, index + 1)}
                        />
                      </div>
                    );
                  })}
                </td>
              )}
            </tr>
          </>
        );
      })}

      <tr>
        <td rowspan="2">01</td>
        <td rowspan="2" className="table-mess">
          <input type="text" placeholder="example" value={curItem.message} onChange={(e)=>setCurItem({...curItem,message: e.target.value})}/>
        </td>
        <td className={curItem.options.name ? "table-border-option" : ""}>
          <select name="" id="" value={curItem.options.name} onChange={(e)=>setCurItem({...curItem,options: {...curItem.options, name: e.target.value}})}>
            <option style={{ display: "none" }} selected>
              . . .
            </option>
            <option value="Option">Option</option>
            <option value="Datapicker">Datapicker</option>
          </select>
        </td>
        <td
          className={
            curItem.options.name ? "table-border-option" : "table-border-none"
          }
        >
          <input type="text" placeholder="example" />
        </td>
        <td rowspan="2">
          <div className="table-CVpoint">
            <input type="radio" className="table-radio" />
            <PlusCircleFilled style={{ color: "#52C41A" }} onClick={() => insertTable(table.length)}/>
            <DeleteFilled style={{ color: "#8C8C8C" }} />
          </div>
        </td>
      </tr>
      <tr>
        {curItem.options.name && (
          <td colspan="2" className="table-option-padding">
            {curItem.options.data.map((option, index) => {
              return (
                <div className="table-option">
                  <label htmlFor="">オプション1</label>
                  <div className="table-input">
                    <input
                      type="text"
                      placeholder="キャンペーン"
                      
                    />
                    <CloseCircleFilled className="table-input-icon" />
                  </div>
                  <PlusCircleOutlined style={{ color: "#52C41A" }} onClick={()=>insertOption(curItem, index)}/>
                </div>
              );
            })}
          </td>
        )}
      </tr>
    </table>
  );
}
