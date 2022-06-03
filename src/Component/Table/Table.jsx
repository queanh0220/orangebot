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

      props.setSelected(selectedRowKeys);
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
      rowKey={(record) => record["_id"]}
      pagination={{ pageSize: props.pageSize }}
      expandable={props.expandable}
      expandRowByClick={props.expandRowByClick}
      loading={props.loading}
      onRow={props.onRow}
    />
  );
}
