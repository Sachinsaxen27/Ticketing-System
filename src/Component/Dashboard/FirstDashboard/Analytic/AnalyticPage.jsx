import React, { useContext, useEffect, useState } from 'react'
import './AnalyticPage.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TicketsystemAPi from '../../../../ContextAPI/TicketsystemApi'
import { toast, ToastContainer } from 'react-toastify';

function AnalyticPage() {
  const date = new Date()
  const context=useContext(TicketsystemAPi)
  const{Admininfo,Memberinfo}=context
  const Admin = (Admininfo && Object.keys(Admininfo).length > 0) ? Admininfo : Memberinfo
  const [chatNumber, setMyChatNumber] = useState();
  const [Average_time, setMyAveragetime] = useState() 
  const[ResolvedNumber,setMyResolveNumber]=useState()

  // const [data, setMydata] = useState([
  //   {
  //     "date": "2025-04-20",
  //     "count": 15
  //   },
  //   {
  //     "date": "2025-04-23",
  //     "count": 5
  //   },
  //   {
  //     "date": "2025-04-25",
  //     "count": 25
  //   },
  //   {
  //     "date": "2025-04-27",
  //     "count": 10
  //   },
  //   {
  //     "date": "2025-04-28",
  //     "count": 20
  //   },
  //   {
  //     "date": "2025-04-30",
  //     "count": 14
  //   },
  //   {
  //     "date": "2025-05-01",
  //     "count": 5
  //   },
  //   {
  //     "date": "2025-05-8",
  //     "count": 18
  //   }
  // ])
  const[data,setMyData]=useState([])
  const BaseUrl = import.meta.env.VITE_API_URL;

  const GetAverage = async () => {
    const response = await fetch(BaseUrl+"/ ", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    if (json) {
      setMyChatNumber(json.totalConversations)
      setMyAveragetime(json.avgGap),
      setMyResolveNumber(json.resolvedPercentage)
    }
  }
  const MissedChat = async () => {
    const response = await fetch(BaseUrl+"/api/messagebox/Missed_chat", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()  
    if (json) {
      setMyData(json)
    }
  }
  useEffect(() => { 
    MissedChat()
    GetAverage()
    toast("This chart represent the data where the ticket would not be resolved or seen within 3 hour")
  }, [])
  return (
    <div>
      <div className='chatbotheading'>
        Analytics
      </div>
      <div>
        <h2 className='missedchat'>Missed Chat</h2>
      
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Missed Chats', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#00D907"fill='#00D907' />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='Average_Chat_div'>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px' }}>Average Reply time</h2>
          <p style={{ fontWeight: '500' }}>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 <br /> seconds or less. Quick responses will get you more conversations, help you earn customers trust and <br /> make more sales.</p>
        </div>
        <div className='Average_timer'>
          <div>{String(Math.floor(Average_time / 60)).padStart(2, '0')} Minute</div><div>{String(Average_time % 60).padStart(2, '0')} Second</div>
        </div>
      </div>
      <div className='Average_Chat_div' style={{ marginTop: "30px" }}>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px' }}>Resolved Tickets</h2>
          <p style={{ fontWeight: '500' }}>A callback system on a website, as well as proactive invitations, help to attract even more customers. A <br /> separate round button for ordering a call with a small animation helps to motivate more <br /> customers to make calls.</p>
        </div>
        <div className='Average_timer_div'>
          <div style={{ width: '100px', height: "100px" }}>
            <CircularProgressbar value={ResolvedNumber} text={ResolvedNumber+'%'} styles={buildStyles({ pathColor: '#4caf50', trailColor: '#eee', textColor: '#000', strokeLinecap: "round" })} />
          </div>
        </div>
      </div>
      <div className='Average_Chat_div' style={{ alignItems: "flex-end" }}>
        <div style={{ marginRight: "10px" }}>
          <h2 className='missedchat' style={{ marginLeft: '0px', marginBottom: '15px' }}>Total Chats</h2>
          <p style={{ fontWeight: '500' }}>This metric Shows the total number of chats for all Channels for the selected the selected period .</p>
        </div>
        <div className='Average_timer_div' style={{ marginLeft: "4rem" }}>
          {chatNumber} Chats
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AnalyticPage
