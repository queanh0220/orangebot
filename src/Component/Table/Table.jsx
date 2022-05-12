import React from "react";
import "./Table.css";
import { Table } from "antd";
export default function Tables(props) {

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={props.columns}
      dataSource={props.data}
      pagination={{ pageSize: props.pageSize }}
    />
  );
}
