import React, { useContext, useEffect, useState } from 'react'
import image1 from '../../../Image/cloud.png'
import image2 from '../../../Image/Vector.png'
import image3 from '../../../Image/comment.png'
import image4 from '../../../Image/statistic.png'
import image5 from '../../../Image/bot.png'
import image6 from '../../../Image/teams.png'
import image7 from '../../../Image/setting.png'
import image8 from '../../../Image/sms.png'
import image9 from '../../../Image/Ellipse.png'
import image10 from '../../../Image/People.png'
import image11 from '../../../Image/profile.png'
// import './MainDashbaord.css';
import './MainDashboard.css'
import ContactCenter from './Contact Center/ContactCenter'
import AnalyticPage from './Analytic/AnalyticPage'
import ChatBotPage from './ChatBot/ChatBotPage'
import TeamsPage from './Teams Member/TeamsPage'
import SettingsPage from './Settings/SettingsPage'
import { useNavigate } from 'react-router-dom'
import TicketSystemAPI from '../../../ContextAPI/TicketsystemApi'
function MainDashbaord() {
    const [showoption, setMyshowoption] = useState("Dashboard")
    const [chats, setMyChats] = useState([])
    const [Alluser, setMyAllUser] = useState()
    const navigate = useNavigate()
    const context = useContext(TicketSystemAPI)
    const { Admininfo, Memberinfo } = context
    const Admin = (Admininfo && Object.keys(Admininfo).length > 0) ? Admininfo : Memberinfo;
    const GetConversation = async (e) => {
        const response = await fetch(`http://localhost:5000/api/messagebox/get_messages/${Admin._id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        console.log(json.messages)
        if (json) {
            setMyChats(json.messages)
        }
    }
    useEffect(() => {
        if (Admin.role === "Admin") {
            GetConversation()
        }
    }, [Admin])
    const handlelogout = () => {
        if (localStorage.getItem('member-token')) {
            localStorage.removeItem('member-token')
        } else if (localStorage.getItem('authtoken')) {
            localStorage.removeItem('authtoken')

        }
        navigate('/')
    }
    const handlelogoutshow = () => {
        let element = document.getElementById('logoutshow')
        if (element.style.display === 'none') {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
        if (element.style.display === 'block') {

            setTimeout(() => {
                let element = document.getElementById('logoutshow')
                if (element.style.display === 'block') {
                    element.style.display = 'none'
                }

            }, 5000);
        }
        clearInterval()
    }
    const handleALLChat = async () => {
        const response = await fetch('http://localhost:5000/api/messagebox/all_message', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        })
        const json = await response.json()
        if (json) {
            console.log(json.Allchat)
            setMyChats(json.Allchat)
            handleALuser()
        }
    }
    const handleALuser = async () => {
        const response = await fetch('http://localhost:5000/api/userlogin/getAll_User', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        })
        const json = await response.json()
        if (json) {
            setMyAllUser(json.user)
        }
    }
    // useEffect(() => {
    //     if (Admin.role === 'Admin') {
    //         handleALLChat()
    //     }
    // }, [Admin])
    return (
        <>
            <div style={{ display: 'flex', backgroundColor: '#FFFFFF', fontFamily: "Barlow, sans-serif" }}>
                <div className='leftnavgation'>
                    <div id='cloudimage'>
                        <img src={image1} alt="cloud" />
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Dashboard')}>
                        <img src={image2} alt="home" />
                        {showoption === 'Dashboard' && <p> Dashboard</p>}
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Contact')}>
                        <img src={image3} alt="comment" />{showoption === 'Contact' && <p> Contact Center</p>}
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Analytics')}>
                        <img src={image4} alt="statistics" />{showoption === 'Analytics' && <p>Analytics</p>}
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Chat')}>
                        <img src={image5} alt="bot" />{showoption === 'Chat' && <p>Chat bot</p>}
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Team')}>
                        <img src={image6} alt="teams" />{showoption === 'Team' && <p>Team</p>}
                    </div>
                    <div className='leftnavigationoption' onClick={() => setMyshowoption('Setting')}>
                        <img src={image7} alt="setting" />{showoption === 'Setting' && <p>Setting</p>}
                    </div>
                    <div className='leftnavigationoption profileicon'>
                        <div className='logout' id='logoutshow' onClick={handlelogout}>Logout</div>
                        <img src={image11} alt="profile" onClick={handlelogoutshow} />
                    </div>
                </div>
                {showoption === 'Dashboard' && <div className='dashboardcontent'>
                    <br />
                    <div className='headingdashboard'>
                        <p>Dashboard</p>
                    </div>
                    <div className='searchdiv'>
                        <input type="search" name="serach" id="serach" placeholder='Search for ticket' />
                    </div>
                    <div>
                        <div className='dashboardoption'>
                            <div className='dashboardalltickets'>
                                <img src={image8} alt="" />All tickets
                            </div>
                            {Admin.role !== "Member" && <div className='dashboardresolved'>Resolved</div>}
                            {Admin.role !== "Member" && <div className='dashboardunresolved'>Unresolved</div>}
                        </div>
                    </div>
                    {chats?.map((msg, index) => {
                        return msg.role === 'user' ? <div className='messagebox' key={index}>
                            <div>
                                <div className='messageheader'>
                                    <div className='messageticketnumber'>
                                        <img src={image9} alt="ellipse" />
                                        Ticket #{new Date(msg.message.time).toLocaleDateString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            year: 'numeric'
                                        })}-0{
                                            (new Date(msg.message.time).toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                            })).split('/').join('')
                                        }
                                    </div>
                                    <div>
                                        <p className='messageposttime'>Posted at {new Date(msg.message.time).toLocaleTimeString('en-IN', {
                                            timeZone: 'Asia/Kolkata', // convert to IST
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </div>
                                </div>
                                <div className='messagecontent'>
                                    <div className='messageportion'>{msg.message.text}</div>
                                    <div className='messagetimeinterval'>10:00</div>
                                </div>
                            </div>
                            <hr className='horizontal' />
                            <div className='messagefooter'>
                                <div className='userdetails_1'>
                                    <img src={image10} alt="people" className='dashboardmessageimg' />
                                    <div key={index} className='userdetails2'>
                                        <h5>{msg.senderid.name}</h5>
                                        <p>{msg.senderid.phone}</p>
                                        <p>{msg.senderid.email}</p>
                                    </div>
                                    {/* {Alluser?.map((user, index) => {
                                        if (user._id === msg.senderid) {
                                            return <div key={index} className='userdetails2'>
                                                <h5>{user.name}</h5>
                                                <p>{user.phone}</p>
                                                <p>{user.email}</p>
                                            </div>
                                        }
                                    })} */}
                                </div>
                                <div>
                                    Open Ticket
                                </div>
                            </div>
                        </div> : ""
                    })}
                </div>}
                {showoption === 'Contact' && <ContactCenter />}
                {showoption === 'Analytics' && <AnalyticPage />}
                {showoption === 'Chat' && <ChatBotPage />}
                {showoption === 'Team' && <TeamsPage />}
                {showoption === 'Setting' && <SettingsPage />}
            </div >
        </>
    )
}

export default MainDashbaord
