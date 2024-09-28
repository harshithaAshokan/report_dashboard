import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination } from "antd";
import { CloseCircleFilled, DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Filter from "../../Filter/Filter";
import { NotificationHistoryReport } from "../../../../axios/services";
import { useSelector } from "react-redux";
import { storeDataProps } from "../../../../type/reducer";
import { Helmet } from "react-helmet";

export default function NotificationReport() {
  interface FailureReport {
    key: string;
    date: string;
    typeName: string;
    on_time: string;
    off_time: string;
    max_value: string;
    duration:string;
    alert_start_value: string;
    max_phase_name: string;
  }

  const token = localStorage.getItem("token") || "";
  const [report, setReports] = useState<FailureReport[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize,setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const dateSelector = useSelector((state:storeDataProps) => state.auth)
  const handleReport = (page = 1, pageSize = 10, start_date: string | string[],
    end_date: string | string[]) => {
    const formData = new FormData();
    formData.append("token", token);
    if (start_date != "") {
      formData.append("fromDatetime", start_date.toString());
    }
    if (end_date != "") {
      formData.append("toDatetime", end_date.toString());
    }
    NotificationHistoryReport(page, pageSize, formData).then((response) => {
      if(response.data.status)
      {
        setReports(response.data.data.items[0]?.data);
      setTotalItems(response.data.data.total_count);
      }
      
    });
  };

  const handlePageChange = (page: number,pageSize:number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    if (token) {
      handleReport(currentPage,pageSize,dateSelector.start_date,dateSelector.end_date);
    }
  }, [token,currentPage,pageSize]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      onCell: (_: FailureReport, index?: number) => {
        if (index === 0) {
          return {
            rowSpan: pageSize,
          };
        }
        if (index && index > 0) {
          return {
            rowSpan: 0,
          };
        }
        return {};
      },
    },
    {
      title: "S.No",
      dataIndex: "index",
      render: (text: string, record: FailureReport, index: number) =>
        index + 1 + (currentPage - 1) * pageSize, // Serial number logic
    },
    {
      title: "Alert Type",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "On Time",
      dataIndex: "on_time",
      key: "on_time",
    },
    {
      title: "Off Time",
      dataIndex: "off_time",
      key: "off_time",
    },
    {
         title:"Duration",
         dataIndex: "duration"
    },
    {
      title: "Alarm Value",
      dataIndex: "max_value",
      key: "max_value",
    },
    {
      title: "Difference Value",
      dataIndex: "alert_start_value",
      key: "alert_start_value",
    },
    {
      title: "Phase",
      dataIndex: "max_phase_name",
      key: "max_phase_name",
    },
  ];

  return (
    <div>
      <Helmet><title>Notification History</title></Helmet>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <h5 className="text-start mt-3 ms-3 ">Notification Report</h5>
        </Col>
        <Col xs={24} sm={12} md={12}>
        <Row gutter={[3,3]} className="float-end me-5">
          <Col xs={6} md={6}><Button
            shape="circle"
            className="float-start mt-2"
            onClick={() => setFilter(!filter)}
          >
            {filter ? <CloseCircleFilled /> : <SearchOutlined />}
          </Button>
          </Col>
          <Col xs={18} md={18} className="float-start"><Button className="float-start mt-2 downloadbtn"><DownloadOutlined/>Download </Button></Col></Row>
        </Col>
      </Row>

      <Card  className="ms-3 me-3 mt-3 bg-light">
        {filter && (
          <Filter listapicall={handleReport} currentPage={currentPage} />
        )}
        <p className="fw-bold text-start mt-2">
          Showing {(currentPage - 1) * pageSize + 1}-{(currentPage - 1) * pageSize + pageSize} of {totalItems} items
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
