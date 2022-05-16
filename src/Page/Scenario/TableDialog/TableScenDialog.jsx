import {
  CloseCircleFilled,
  CloseCircleOutlined,
  DeleteFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./TableDialog.css";
export default function TableScenDialog(props) {
  const [table, setTable] = useState([
    {
      message: "",
      control: {
        label: "",
        data: {
          Option: ["", ""],
          Datapicker: { stime: "", etime: "" },
          Dropdown: ["", ""],
        },
        input: ["input: text", "input: tel", "input: email"],
      },
      name: "",
      cv: false,
    },
  ]);

  const insertTable = (index) => {
    table.splice(index, 0, {
      message: "",
      control: {
        label: "",
        data: {
          Option: ["", ""],
          Datapicker: { stime: "", etime: "" },
          Dropdown: ["", ""],
        },
        input: ["input: text", "input: tel", "input: email"],
      },
      name: "",
      cv: false,
    });
    console.log(table);
    setTable([...table]);
  };

  const insertOption = (item, index) => {
    item.splice(index, 0, "");
    setTable([...table]);
  };

  const changeOption = (item, e) => {
    item.control.label = e.target.value;
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
    item[index] = e.target.value;
    setTable([...table]);
  };

  const deleteTable = (index) => {
    table.splice(index, 1);
    setTable([...table]);
  };

  useEffect(() => {
    console.log(props.onSave);
    if (props.onSave) {
      console.log("save table", table);
      props.endSave();
    }
  }, [props.onSave]);

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
              <td className={item.control.label ? "table-border-option" : ""}>
                <select
                  name=""
                  id=""
                  value={item.control.label}
                  onChange={(e) => changeOption(item, e)}
                >
                  <option style={{ display: "none" }} selected>
                    . . .
                  </option>
                  {Object.keys(item.control.data).map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                  {item.control.input.map((input) => (
                    <option value={input}>{input}</option>
                  ))}
                </select>
              </td>
              <td
                className={
                  item.control.label
                    ? "table-border-option"
                    : "table-border-none"
                }
              >
                <input
                  type="text"
                  placeholder="キャンペーン"
                  value={item.name}
                  onChange={(e) => handleChangeName(item, e)}
                />
              </td>
              <td rowspan="2">
                <div className="table-CVpoint">
                  <input type="radio" className="table-radio" />
                  <PlusCircleFilled
                    style={{ color: "#52C41A" }}
                    onClick={() => insertTable(index + 1)}
                  />
                  {index === table.length - 1 ? (
                    <DeleteFilled
                      style={{ color: "#8C8C8C" }}
                    />
                  ) : (
                    <DeleteFilled
                      style={{ color: "#FF4D4F" }}
                      onClick={() => deleteTable(index)}
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              {item.control.label && (
                <td colspan="2" className="table-option-padding">
                  {item.control.label === "Option" ||
                  item.control.label === "Dropdown" ? (
                    item.control.data[item.control.label].map(
                      (option, index) => {
                        return (
                          <div className="table-option" key={index}>
                            <label htmlFor="">オプション1</label>
                            <div className="table-input">
                              <input
                                type="text"
                                placeholder="キャンペーン"
                                value={option}
                                onChange={(e) =>
                                  handleChangeTextOption(
                                    item.control.data[item.control.label],
                                    index,
                                    e
                                  )
                                }
                              />
                              <CloseCircleFilled className="table-input-icon" />
                            </div>
                            <PlusCircleOutlined
                              style={{ color: "#52C41A" }}
                              onClick={() =>
                                insertOption(
                                  item.control.data[item.control.label],
                                  index + 1
                                )
                              }
                            />
                          </div>
                        );
                      }
                    )
                  ) : item.control.label === "Datapicker" ? (
                    <>
                      <div className="table-option">
                        <label htmlFor="">開始日</label>
                        <div className="table-input">
                          <input
                            className="table-input-date"
                            type="date"
                            placeholder="キャンペーン"
                            value={item.control.data.Datapicker.stime}
                            onChange={(e) => {
                              item.control.data.Datapicker.stime =
                                e.target.value;
                              setTable([...table]);
                            }}
                          />
                        </div>
                      </div>
                      <div className="table-option">
                        <label htmlFor="">終了日</label>
                        <div className="table-input">
                          <input
                            className="table-input-date"
                            type="date"
                            placeholder="キャンペーン"
                            value={item.control.data.Datapicker.etime}
                            onChange={(e) => {
                              item.control.data.Datapicker.etime =
                                e.target.value;
                              setTable([...table]);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </td>
              )}
            </tr>
          </>
        );
      })}
    </table>
  );
}
