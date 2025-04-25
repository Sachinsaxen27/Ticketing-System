import React from 'react'
import './AnalyticPage.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, CartesianAxis } from 'recharts'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function AnalyticPage() {
  const data = [
    { name: 'Page A', uv: 15 },
    { name: 'Page B', uv: 10 },
    { name: 'Page C', uv: 15 },
    { name: 'Page D', uv: 7 },
    { name: 'Page F', uv: 5 },
    { name: 'Page E', uv: 12 },
    { name: 'Page G', uv: 3 },
    { name: 'Page H', uv: 7 },
    { name: 'Page I', uv: 15 },
    { name: 'Page J', uv: 20 },
  ];

  return (
    <div>
      <div className='chatbotheading'>
        Analytics
      </div>
      <div>
        <h2 className='missedchat'>Missed Chat</h2>
        <LineChart width={700} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0, }}>
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="uv" stroke="#00D907" fill="#8884d8" />
        </LineChart>
      </div>
      <div className='Average_Chat_div'>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px' }}>Average Reply time</h2>
          <p style={{ fontWeight: '500' }}>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 <br /> seconds or less. Quick responses will get you more conversations, help you earn customers trust and <br /> make more sales.</p>
        </div>
        <div className='Average_timer_div'>
          0 Sec
        </div>
      </div>
      <div className='Average_Chat_div' style={{ marginTop: "30px" }}>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px' }}>Resolved Tickets</h2>
          <p style={{ fontWeight: '500' }}>A callback system on a website, as well as proactive invitations, help to attract even more customers. A <br /> separate round button for ordering a call with a small animation helps to motivate more <br /> customers to make calls.</p>
        </div>
        <div className='Average_timer_div'>
          <div style={{ width: '100px', height: "100px" }}>
            <CircularProgressbar value={80} text='80%' styles={buildStyles({ pathColor: '#4caf50', trailColor: '#eee', textColor: '#000', strokeLinecap: "round" })} />
          </div>
        </div>
      </div>
      <div className='Average_Chat_div' style={{alignItems:"flex-end"}}>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px',marginBottom:'15px'}}>Total Chats</h2>
          <p style={{ fontWeight: '500' }}>This metric Shows the total number of chats for all Channels for the selected the selected period .</p>
        </div>
        <div className='Average_timer_div' style={{marginLeft:"4rem"}}>
          122 Chats
        </div>
      </div>
    </div>
  )
}

export default AnalyticPage
