import React, { useEffect, useState } from "react";
import Topbar from "../../Component/Topbar/Topbar";
import "./Scenario.css";
import icon from "../../Svg/scenario.svg";
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import Tables from "../../Component/Table/Table";
import emptyImg from "../../Svg/empty.svg";
import Dialog from "./Dialog/Dialog";
import { Table, Tag } from "antd";
import ScenarioTable from "./ScenarioTable/ScenarioTable";
import axiosCustom from "../../Api/axiosCustom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { dateToString } from "../../Utils/formatDate";
export default function Scenario() {
  const getData = () => {
    return axiosCustom.get("/scenarios").then((res) => res.data);
  };
  const { data } = useQuery("get-scenarios", getData, {
    initialData: [],
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selected, setSelected] = useState([]);

  const deleteScens = (data) => {
    console.log(data);
    return axios.delete(process.env.REACT_APP_API_URL+'scenarios',  {data: data}).then(()=>{toast.success('delete success')})
  }

  const queryClient =  useQueryClient();
  const mutation = useMutation(deleteScens, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-scenarios");
    },
  })
  const handleDelete = () => {
    mutation.mutate(selected);
  };

  const columns = [
    {
      title: "シナリオ名",
      dataIndex: "name",
      render: (name) => {
        return (
          <>
            <img src={name.icon} alt="" className="scenario-table-icon"/>
            <span>{name.text}</span>
          </>
        );
      },
    },
    {
      title: "作成者",
      dataIndex: "author",
      width: "15%",
    },
    {
      title: "作成日",
      dataIndex: "date",
      width: "15%",
      render: (date) => {
        return dateToString(new Date(date))
      }
    },
    {
      title: "タグ",
      dataIndex: "tags",
      width: "25%",
      render: (tags) => {
        return tags.map((item, index) => {
          return (
            <Tag color={item.toLowerCase()} key={index}>
              #{item}
            </Tag>
          );
        });
      },
    },
    Table.EXPAND_COLUMN,
    {
      title: (
        <span className="scenario-table-title">
          Title{" "}
          <DeleteFilled
            className={selected.length > 0 ? "scen-icondel-active" : ""}
            onClick={handleDelete}
          />
        </span>
      ),
      dataIndex: "_id",
      with: "15%",
      render: (id) => {
        return (
          <label htmlFor={id}>
            <a>Edit</a>
          </label>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="scenario">
      <Topbar icon={icon} title="シナリオの設定" />
      <div className="main">
        <div className="scenario-content bg-item">
          {data.length === 0 ? (
            <>
              <div className="senario-empty">
                <img src={emptyImg} alt="" />
                <p className="color-g">
                  まだ投稿はありません。 今すぐ投稿を作成しましょう！
                </p>
                <button className="button" onClick={() => setShowDialog(true)}>
                  <PlusCircleFilled />
                  <p>新しいシナリオを作成する</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="button" onClick={() => setShowDialog(true)}>
                <PlusCircleFilled />
                <p>新しいシナリオを作成する</p>
              </button>
              <Tables
                setSelected={setSelected}
                columns={columns}
                data={data}
                pageSize={10}
                expandable={{
                  expandedRowRender: (record) => (
                    <ScenarioTable table={record.table} />
                  ),
                  expandIcon: ({ expanded, onExpand, record }) => (
                    <input
                      onClick={(e) => onExpand(record, e)}
                      id={record._id}
                      style={{ display: "none" }}
                    ></input>
                  ),
                }}
              />
            </>
          )}
          <Dialog show={showDialog} setShow={setShowDialog} />
        </div>
      </div>
    </div>
  );
}
