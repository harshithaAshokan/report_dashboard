import { Table } from 'antd'
import { time } from 'console';
import { title } from 'process';
import React from 'react'
interface consumptionProps {
  index:string;
  date:string;
  startTime:string;
  endTime:string;
  reading:string;
  consumed:string;
  eb:string;
  sump:string;
  borewell:string;
}
export default function ConsumptionReport() {
    const columns = [
        {
          title: "S.No",
          dataIndex: "index",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Start Time",
          dataIndex: "startTime",
          key: "startTime",
        },
        {
          title: "End Time",
          dataIndex: "endTime",
          key: "endTime",
        },
        {
          title: "Reading (kWH)",
          dataIndex: "reading",
          key: "reading",
        },
        {
          title: "Consumed (kWH)",
          dataIndex: "consumed",
          key: "consumed",
        },
        {
            title:"Eb",
            dataIndex: "eb",
            key: "eb"
        },
        {
            title:"Sump",
            dataIndex: "sump",
            key: "sump"
        },
        {
            title:"Borewell",
            dataIndex: "sump",
            key: "sump"
        }
       
        
      ];
      const data = [
        {
            index: "1",
            date: "2024-09-24",
            startTime : "00:00 AM",
            endTime : "-",
            reading: "12833.56",
            consumed:"10.36",
            eb:"-",
            sump:"-",
            borewell:"-"
        },
        {
            index: "2",
            date: "2024-09-23",
            startTime : "00:00 AM",
            endTime : "23:59 PM",
            reading: "12757.51",
            consumed:"76.06",
            eb:"23 hr 59 mins",
            sump:"-",
            borewell:"0 hr 23 mins"
        }
      ]
  return (
    <div>
      <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className='mt-2 table-responsive mx-auto py-3'
          
        />
    </div>
  )
}
