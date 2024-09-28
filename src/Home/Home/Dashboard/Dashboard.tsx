import { Button, Card, Col, Row, Space, Typography } from "antd";
import Chart from "react-apexcharts";
import dash3 from "../../../assets/WhatsApp Image 2024-09-24 at 15.34.27_d5593a73.jpg";
import { ApexOptions } from "apexcharts";
import ConsumptionReport from "./Tables/ConsumptionReport";
import ONOFFTable from "./Tables/ONOFFTable";
import { Helmet }from 'react-helmet'
import { useEffect, useState } from "react";
import classes from './Dashboard.module.css'
const { Title } = Typography;

export default function Dashboard() {
  const energySeriesValue = [30, 40, 45, 50, 49, 60, 70, 91, 75, 34, 56, 89];
  const loadSeriesValue = [10, 20, 10, 30, 40, 58, 20, 40];
  const [energySeriesData, setEnergySeriesData] = useState<{ name: string; data: number[] }[]>([]);
  const [loadSeriesData, setLoadSeriesData] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    setEnergySeriesData([{ name: "Energy", data: energySeriesValue }]);
    setLoadSeriesData([{ name: "Load", data: loadSeriesValue }]);
  }, []);

  const powerHoursChartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#2fa49f", "#0000FF", "red"],
    series: [99,1], // Percentage data
    fill: {
      type: 'gradient',
    },
    
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
            height: "300px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const ConsumptionChartOptions: ApexOptions = {
    series: [76],
    colors: ['#2fa49f'],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: -2,
          fontSize: '22px'
        }
      }
    }
  },
  fill: {
    type: 'gradient',
  },
  
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
            height: "300px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            width: "100%",
            height: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const HoursChartOptions: ApexOptions = {
    
    colors: ["#2fa49f"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
    },
    xaxis: {
      title: {
        text: 'Day', // Set the X-axis title
      },
    },
    yaxis: {
      title: {
        text: 'kWH', // Set the Y-axis title
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
            height: "300px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            width: "100%",
            height: "250px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const LoadChartOptions: ApexOptions = {
    
    colors: ["#FFDB58"],// Percentage data
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      
    },
    xaxis: {
      title: {
        text: 'Day', // Set the X-axis title
      },
    },
    yaxis: {
      title: {
        text: 'kiloWatt', // Set the Y-axis title
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
            height: "300px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          chart: {
            width: "100%",
            height: "250px",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };



  return (
    <>
    <Helmet><title>Dashboard</title></Helmet>
    <div className="p-3">
      
      <Row gutter={[16, 16]}>
        {/* Device Details */}
        <Col xs={24} sm={24} md={8}>
          <Card >
            <Title level={5} className="text-start fw-bold">Device Details</Title>
            <Row gutter={[16, 16]} className="ms-3">
              <Col>
                <p className="fw-bold">EB</p>
                <p>ON</p>
              </Col>
              <Col>
                <p className="fw-bold">SUMP</p>
                <p>OFF</p>
              </Col>
              <Col>
                <p className="fw-bold">BOREWELL</p>
                <p>OFF</p>
              </Col>
              <Col>
                <p className="fw-bold">Relay1</p>
                <p>OFF</p>
              </Col>
              <Col>
                <p className="fw-bold">Relay2</p>
                <p>OFF</p>
              </Col>
            </Row>
          </Card>
          <Card className="mt-2">
            <p className="fw-bold fs-6">Last Communication Date</p>
            <p>(24-09-2024 09:57 AM)</p>
            <p>Device Data Not Received: -</p>
            <p>
              Read Error Time: <span className="fw-bold fs-6">0 hr 0 mins</span>
            </p>
          </Card>
        </Col>

        {/* Charts */}
        <Col xs={24} sm={24} md={8}>
          <Card className="h-100">
            <Title level={4} className="fw-bold text-start">Today consumption</Title>
            {ConsumptionChartOptions && (
              <Chart
                options={ConsumptionChartOptions}
                series={ConsumptionChartOptions?.series}
                width="100%"
                type="radialBar"
                className="mt-5"
              />
            )}
            <p className="mt-2">Average Consumption of Last Week : <span className="fw-bold">55.68</span> (kWH)</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className="h-100">
            <Title level={4} className="fw-bold text-start">Power Running Hours</Title>
            {powerHoursChartOptions && (
              <Chart
                options={powerHoursChartOptions}
                series={powerHoursChartOptions?.series}
                type="donut"
                width="100%"
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Power Consumption and Details */}
      <Row gutter={[16, 16]} className="mt-2">
        <Col xs={24} md={6}>
          <Card className="h-100 customcard">
            <Title level={4} className="fw-bold text-start">Total Consumption</Title>
            <img src={dash3} className={classes.dashicon}  alt="Dash3" />
            <h4 className="mt-2">12483.78 (kWH)</h4>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card className="customcard">
            <p className="fw-bold text-start fs-6">Total Watts: 8.42 (kW)</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">R</Button>
              <span>3.5</span>
              <Button shape="circle" size="small" className="warningbtn">Y</Button>
              <span>1.25</span>
              <Button shape="circle" size="small" variant="solid" color="primary">B</Button>
              <span>3.67</span>
            </Space>
          </Card>

          <Card className="mt-2 customcard">
            <p className="fw-bold text-start fs-6">Total VA: 8.43</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">R</Button>
              <span>3.5</span>
              <Button shape="circle" size="small" className="warningbtn">Y</Button>
              <span>1.26</span>
              <Button shape="circle" size="small"  variant="solid" color="primary">B</Button>
              <span>3.67</span>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card className="customcard">
            <p className="fw-bold text-start fs-6">Avg LN Volts: 221.46 (V)</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">R</Button>
              <span>219.38</span>
              <Button shape="circle" size="small" className="warningbtn">Y</Button>
              <span>224.05</span>
              <Button shape="circle" size="small" variant="solid" color="primary">B</Button>
              <span>220.95</span>
            </Space>
          </Card>

          <Card className="mt-2 customcard">
            <p className="fw-bold text-start fs-6">Avg Amps: 13.07 (A)</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">R</Button>
              <span>16.93</span>
              <Button shape="circle" size="small" className="warningbtn">Y</Button>
              <span>5.64</span>
              <Button shape="circle" size="small"  variant="solid" color="primary">B</Button>
              <span>16.56</span>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card className="customcard">
            <p className="fw-bold text-start fs-6">Avg LL Volts: 383.57 (V)</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">RY</Button>
              <span>381.66</span>
              <Button shape="circle" size="small" variant="solid" className="warningbtn">YB</Button>
              <span>382.54</span>
              <Button shape="circle" size="small" variant="solid" color="primary">BR</Button>
              <span>386.51</span>
            </Space>
          </Card>

          <Card className="mt-2 customcard">
            <p className="fw-bold text-start fs-6">Avg PF: -1</p>
            <Space size="small" wrap>
              <Button shape="circle" size="small" variant="solid" color="danger">R</Button>
              <span>-1</span>
              <Button shape="circle" size="small" className="warningbtn">Y</Button>
              <span>-1</span>
              <Button shape="circle" size="small"  variant="solid" color="primary">B</Button>
              <span>-1</span>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Energy Consumption Charts */}
      <Row gutter={[16, 16]} className="mt-3">
        <Col xs={24} md={12}>
          <Card>
            <Title level={4} className="text-start fw-bold">Hourly Energy Consumption</Title>
            {
              HoursChartOptions && (
                <Chart options={HoursChartOptions} series={energySeriesData} type="bar" width="100%" />
              )
            }
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4} className="text-start fw-bold">Daywise Energy Consumption</Title>
            {
              HoursChartOptions && (
                <Chart options={HoursChartOptions} series={energySeriesData} type="line" width="100%" />
              )
            }
          </Card>
        </Col>
     </Row>
     <Row gutter={[16, 16]} className="mt-3">
     <Col xs={24} md={12}>
          <Card className="h-100">
          <Title level={4} className="text-start fw-bold">Consumption Report</Title>
            <ONOFFTable />
          </Card>
          
        </Col>
        <Col xs={24} md={12}>
          <Card className="h-100">
          <Title level={4} className="text-start fw-bold">ON OFF History</Title>
            <ConsumptionReport />
          </Card>
        </Col>
      
     </Row>
     <Row gutter={[16, 16]} className="mt-3">
        <Col xs={24} md={12}>
          <Card>
            <Title level={4} className="text-start fw-bold">Hourly Peek Load (Watts)</Title>
            {
              LoadChartOptions && (
                <Chart options={LoadChartOptions} series={loadSeriesData} type="bar" width="100%" />
              )
            }
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4} className="text-start fw-bold">Daywise Peek Load (Watts)</Title>
            {
              LoadChartOptions && (
                <Chart options={LoadChartOptions} series={loadSeriesData} type="line" width="100%" />
              )
            }
          </Card>
        </Col>
     </Row>
        
    </div>
    </>
  );
}
