import { Button, Card, Col, Pagination, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { failureAnalysisReport } from "../../../../axios/services";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import Filter from "../../Filter/Filter";
import { useSelector } from "react-redux";
import { storeDataProps } from "../../../../type/reducer";
import { Helmet } from "react-helmet";
export default function FailureAnalysis() {
  interface failureReport {
    key: string;
    date_time: string;
    api: string;
    api_response: string;
    params: string;
  }

  const token = localStorage.getItem("token") || "";
  const [report, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const dateSelector = useSelector((state:storeDataProps) => state.auth)
  const handleReport = (
    page = 1,
    pageSize = 10,
    start_date: string | string[],
    end_date: string | string[]
  ) => {
    const formData = new FormData();
    formData.append("token", token);
    if (start_date != "") {
      formData.append("fromDatetime", start_date.toString());
    }
    if (end_date != "") {
      formData.append("toDatetime", end_date.toString());
    }
    failureAnalysisReport(page, pageSize, formData).then((response) => {
      setReports(response.data.data.items);
      setTotalItems(response.data.data.total_count);
    });
  };
  const handlePageChange = (page: number,pageSize:number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => {
    if (token) {
      handleReport(currentPage, pageSize,dateSelector.start_date,dateSelector.end_date);
    }
  }, [token, currentPage,pageSize]);
  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text: string, record: failureReport, index: number) =>
        index + 1 + (currentPage - 1) * 4,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Api",
      dataIndex: "api",
      key: "api 1",
      render: (text: string, record: failureReport) => {
        const shortenedApi =
          record.api.length > 20
            ? `${record.api.substring(0, 20)}...`
            : record.api;
        return (
          <>
            {shortenedApi}
            <p className="text-end underlined">
              <a className="primary">Show More</a>
            </p>
          </>
        );
      },
    },
    {
      title: "Api Response",
      dataIndex: "api_response",
      key: "api_response",
    },
    {
      title: "Response Time",
      dataIndex: "response_time",
      key: "response_time",
    },
    {
      title: "Call Method",
      dataIndex: "call_method",
      key: "call_method",
    },
    {
      title: "Params",
      dataIndex: "params",
      key: "params",
      render: (text: string, record: failureReport) => {
        const shortenedApi =
          record.params.length > 20
            ? `${record.params.substring(0, 20)}...`
            : record.params;
        return (
          <>
            {shortenedApi}
            <p className="text-end underlined">
              <a className="primary">Show More</a>
            </p>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Helmet><title>Failure Analysis</title></Helmet>
      <Row gutter={6}>
        <Col xs={12} md={12}>
          <h5 className="text-start mt-3 ms-3 ">Failure Analysis Report</h5>
        </Col>
        <Col xs={12} md={12}>
          <Button
            shape="circle"
            className="float-end me-5 mt-3"
            onClick={() => setFilter(!filter)}
          >
            {filter ? <CloseCircleFilled /> : <SearchOutlined />}
          </Button>
        </Col>
      </Row>

      <Card className="ms-3 me-3 mt-3 bg-light">
        {filter && (
          <Filter listapicall={handleReport} currentPage={currentPage} />
        )}
        <p className="fw-bold text-start mt-2">
          Showing 1-10 of {totalItems} items
        </p>
        <Table
          columns={columns}
          dataSource={report}
          pagination={false}
          bordered
          className="mt-2 table-responsive mx-auto py-3"
          scroll={{ x: "max-content" }}
          
        />

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}

        />
      </Card>
    </div>
  );
}
