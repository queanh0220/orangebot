import React from 'react'
import './ScenarioTable.css'
export default function ScenarioTable(props) {

  return (
    <table className="dialog-table scenario-table">
      <tr>
        <th>No</th>
        <th>メッセージ</th>
        <th>コントロール</th>
        <th>項目名</th>
        <th className='scen-table-cv'>CV地点</th>
      </tr>
      {props.table.map((item, index) => {
        return (
          <>
            <tr>
              <td rowspan="2">{index+1}</td>
              <td rowspan="2" className="table-mess">
               {item.message}
                 
              </td>
              <td className={(item.control.label === "Option" || item.control.label === "Datapicker" || item.control.label === "Dropdown") ? "table-border-option" : ""}>
               {item.control.label}
                  
              </td>
              <td
                className={
                  (item.control.label === "Option" || item.control.label === "Datapicker" || item.control.label === "Dropdown")
                    ? "table-border-option"
                    : "table-border-none"
                }
              >
                {item.name}
                 
              </td>
              <td rowspan="2">
                <div className="table-CVpoint">
                  <input type="radio" className="table-radio" checked={item.cv} onChange={()=>{}}/>
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
                                value={option}
                                readOnly={true}
                              />
                   
                            </div>
                            
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
                            readOnly={true}
                            value={item.control.data.Datapicker.stime}
                        
                          />
                         
                        </div>
                      </div>
                      <div className="table-option">
                        <label htmlFor="">終了日</label>
                        <div className="table-input">
                        <input
                            className="table-input-date"
                            type="date"
                            readOnly={true}
                            value={item.control.data.Datapicker.etime}
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
  )
}
