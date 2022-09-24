import { Space, Table, Tag, Pagination, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import type { PaginationProps } from "antd";
import { getAccounts } from "../../api/api_accounts";
import { DeleteOutlined, EditOutlined, FileOutlined } from "@ant-design/icons";
import "./index.css";

interface DataType {
  id: number;
  username: string;
  tags: string[];
}

const Accounts: React.FC = () => {
  const [data, setData] = React.useState<DataType[]>([]);
  const [totalRecords, setTotalRecords] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

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

  const editClicked = (record: DataType): void => {
    console.log(record.id);
  };
  const deleteClicked = (record: DataType): void => {
    console.log(record.id);
  };
  const detailsClicked = (record: DataType): void => {
    console.log(record.id);
  };

  useEffect(() => {
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
  }, [pageSize, currentPage]);

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

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <br />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        total={totalRecords}
      />
    </>
  );
};

export default Accounts;
