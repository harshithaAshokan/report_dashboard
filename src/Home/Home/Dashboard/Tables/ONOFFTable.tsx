import { Table } from 'antd'

interface OnoffProps {
  date:string;
  index:string;
  type:string;
  offtime:string;
  ontime:string;
  duration:string;
}
export default function ONOFFTable() {
    const columns = [
        
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          onCell: (_:OnoffProps, index?: number) => {
            if (index === 0 || index === 2) {
              return {
                rowSpan: 2,
              };
            }
            if (index==1 || index ===3) {
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
          },
        {
          title: "Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "On Time",
          dataIndex: "ontime",
          key: "ontime",
        },
        {
          title: "Off Time",
          dataIndex: "offtime",
          key: "offtime",
        },
        {
          title: "Duration",
          dataIndex: "duration",
          key: "duration",
        },
       
        
      ];
      const data = [
        {
            index: "1",
            date: "2024-09-24",
            type:"BOREWELL",
            ontime:"08:07 AM",
            offtime:"08:15 AM",
            duration:"0 hr 7 mins"
        },
        {
            index: "2",
            date: "2024-09-24",
            type:"EB",
            ontime:"08:07 AM",
            offtime:"08:15 AM",
            duration:"0 hr 7 mins"
        },
        {
            index: "3",
            date: "2024-09-24",
            type:"BOREWELL",
            ontime:"08:07 AM",
            offtime:"08:15 AM",
            duration:"0 hr 7 mins"
        },
        {
            index: "4",
            date: "2024-09-24",
            type:"BOREWELL",
            ontime:"08:07 AM",
            offtime:"08:15 AM",
            duration:"0 hr 7 mins"
        },
       
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
