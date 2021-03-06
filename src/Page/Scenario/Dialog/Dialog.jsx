import { Modal, Select, Tag } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axiosCustom from "../../../Api/axiosCustom";
import { uploadFile } from "../../../Api/uploadFile";
import UpImg from "../../../Component/UpImg/UpImg";
import { LoadingContext } from "../../../ContextApi/context-api";
import dialogIcon from "../../../Svg/plus-puple.svg";
import TableScenDialog from "../TableDialog/TableScenDialog";
import "./Dialog.css";
export default function Dialog(props) {
  const [name, setName] = useState("");
  const [tags, setTag] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
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
  const loading = useContext(LoadingContext);

  useEffect(() => {
    if (props.show._id) {
      setName(props.show.name.text);
      setTag(props.show.tags);
      setImg(props.show.name.icon);
      setTable(props.show.table);
      setInputTag(" ");
    }
  }, [props.show]);

  const createScen = async (data) => {
    loading.setLoading(true);
    if (imgFile) {
      const upImg = await uploadFile(imgFile);
      data.name.icon = upImg.data;
    }
    const result = await axiosCustom.post("/scenarios", data).then(() => {
      toast.success("create scenario success");
    });
    loading.setLoading(false);
    return result;
  };

  const updateScen = async (data) => {
    loading.setLoading(true);
    if (imgFile) {
      const upImg = await uploadFile(imgFile);
      data.name.icon = upImg.data;
    }
    const { id, ...newData } = data;
    const result = await axiosCustom
      .put("/scenarios/" + id, newData)
      .then(() => {
        toast.success("update scenario success");
      });

    loading.setLoading(false);
    return result;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(createScen, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-scenarios");
    },
  });

  const mutationUpdate = useMutation(updateScen, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-scenarios");
    },
  });

  const handleClose = () => props.setShow(false);
  const handleOk = async () => {
    //save info
    const data = {
      name: {
        icon: img,
        text: name,
      },
      date: new Date(),
      tags,
      table,
    };
    if (props.show._id) {
      mutationUpdate.mutate({ id: props.show._id, ...data });
    } else {
      mutation.mutate(data);
    }
    setName("");
    setTag([]);
    setInputTag("");
    setImg("");
    setImgFile("");
    setTable([
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
    props.setShow(false);
  };

  const handleChangeTag = (e) => {
    const str = e.target.value;
    if (!str) {
      tags.pop();
      setTag([...tags]);
      setInputTag(" ");
    } else if (/\s+\S+\s$/.test(str)) {
      tags.push(str.replace(/ /g, ""));
      setInputTag(" ");
    } else {
      setInputTag(str);
    }
  };

  return (
    <>
      <Modal
        className="scenario-dilog"
        title={
          <>
            <img src={dialogIcon} className="dialog-icon" />{" "}
            <span className="dialog-title">??????????????????????????????</span>
          </>
        }
        width={700}
        visible={props.show}
        onOk={handleOk}
        onCancel={handleClose}
        footer={[
          <button
            key="back"
            className="button button-dialog cancel-dialog"
            onClick={handleClose}
          >
            ???????????????
          </button>,
          <button
            key="submit"
            className="button button-dialog"
            type="primary"
            loading={false}
            onClick={handleOk}
          >
            ??????
          </button>,
        ]}
      >
        <div className="dialog-content">
          <div className="dialog-input">
            <label htmlFor="">???????????????</label>
            <input
              type="text"
              className="input-text"
              placeholder="??????????????????t????????????????????????"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="label-bottom">
              ??????
            </label>
            <div className="input-text dialog-input-tag">
              <div className="dialog-list-tag">
                {!!tags.length &&
                  tags.map((item, index) => {
                    return (
                      <Tag color={item} key={index}>
                        #{item}
                      </Tag>
                    );
                  })}
              </div>
              <input
                className="input-no-style"
                type="text"
                placeholder="???????????????????????????"
                value={inputTag}
                onChange={handleChangeTag}
              />
            </div>
          </div>
          <div className="dialog-img">
            <p>????????????</p>
            <UpImg img={img} setImgFile={setImgFile} />
          </div>
          <TableScenDialog table={table} setTable={setTable} />
        </div>
      </Modal>
    </>
  );
}
