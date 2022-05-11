import React from "react";
import "./Table.css";
import { Table } from "antd";
export default function Table(props) {
  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...props.rowSelection,
      }}
      columns={props.columns}
      rowKey={(record) => record.login.uuid}
      dataSource={props.data}
      pagination={props.pagination}
      loading={props.loading}
      onChange={() => {}}
    />
  );
}
