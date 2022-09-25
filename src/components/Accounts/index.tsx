import {
  Space,
  Table,
  Tag,
  Pagination,
  Tooltip,
  Button,
  Modal,
  Input,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ChangeEvent, useEffect } from "react";
import type { PaginationProps } from "antd";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccounts,
} from "../../api/api_accounts";
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import AccountDetails from "../AccountDetails";
import { useHistory } from "react-router-dom";

interface DataType {
  id: number;
  username: string;
  tags: string[];
}

const key = "updatable";

const Accounts: React.FC = () => {
  const history = useHistory();
  const [data, setData] = React.useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [modalTitle, setModalTitle] = React.useState<string>("Add Username");
  const [accountUsername, setAccountUsername] = React.useState<string>("");
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      // render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit Row!">
            <EditOutlined
              className="icon"
              onClick={() => editClicked(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Row!">
            <DeleteOutlined
              className="icon"
              onClick={() => deleteClicked(record)}
            />
          </Tooltip>
          <Tooltip title="See Details!">
            <FileOutlined
              className="icon"
              onClick={() => detailsClicked(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedId(0);
  };

  const handleOk = () => {
    if (selectedId === 0) handleAddUsername();
    else handleEditUsername();
  };

  const handleAddUsername = () => {
    addAccount(accountUsername)
      .then((res) => {
        setIsModalOpen(false);
        refreshAccountTable();
        setCurrentPage(1);
        notification["success"]({
          key,
          message: "Successfull",
          description: "Account created successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsModalOpen(false);
        notification["error"]({
          key,
          message: "Unsuccessful",
          description:
            "There was a problem in the account registration process",
        });
      });
  };

  const handleEditUsername = () => {
    editAccount(selectedId, accountUsername)
      .then((res) => {
        setIsModalOpen(false);
        refreshAccountTable();
        setCurrentPage(1);
        notification["success"]({
          key,
          message: "Successfull",
          description: "Account edited successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsModalOpen(false);
        notification["error"]({
          key,
          message: "Unsuccessful",
          description:
            "There was a problem in the process of editing the account",
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAccountUsername("");
  };

  const editClicked = (record: DataType): void => {
    setAccountUsername(record.username);
    setModalTitle("Edit " + record.username);
    setIsModalOpen(true);
    setSelectedId(record.id);
  };

  const deleteClicked = (record: DataType): void => {
    deleteAccount(record.id)
      .then((res) => {
        setIsModalOpen(false);
        refreshAccountTable();
        setCurrentPage(1);
        notification["success"]({
          key,
          message: "Successfull",
          description: "Account Deleted Successfully :)",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsModalOpen(false);
        notification["error"]({
          key,
          message: "Unsuccessful",
          description:
            "There was a problem in the process of deleting the account",
        });
      });
  };

  const detailsClicked = (record: DataType): void => {
    history.push("/app/accountDetails/" + record.id);
  };

  useEffect(() => {
    refreshAccountTable();
  }, [pageSize, currentPage]);

  const refreshAccountTable = () => {
    getAccounts(currentPage, pageSize)
      .then((res) => {
        setData(res.items);
        setTotalRecords(res.totalCount);
        setPageSize(res.pageSize);
        setCurrentPage(res.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current: number,
    pageSize: number
  ) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onAccountUsernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountUsername(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Username
      </Button>
      <br />
      <br />
      <Table columns={columns} dataSource={data} pagination={false} />
      <br />
      <Pagination
        current={currentPage}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        total={totalRecords}
      />
      <Modal
        title={modalTitle}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder={"Write Username ..."}
          prefix={<UserOutlined />}
          value={accountUsername}
          onChange={onAccountUsernameChanged}
        />
      </Modal>
    </>
  );
};

export default Accounts;
