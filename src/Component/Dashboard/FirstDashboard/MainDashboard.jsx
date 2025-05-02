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
import { ToastContainer } from 'react-toastify/unstyled'
import { toast } from 'react-toastify'

function MainDashbaord() {
    const currenttime = new Date()
    const [showoption, setMyshowoption] = useState("Dashboard")
    const [chats, setMyChats] = useState([])
    const navigate = useNavigate()
    const context = useContext(TicketSystemAPI)
    const { Admininfo, Memberinfo } = context
    const Admin = (Admininfo && Object.keys(Admininfo).length > 0) ? Admininfo : Memberinfo
    const [chatNumber, setMyChatNumber] = useState();
    const [OptionChoice, setMyOptionChoice] = useState()
    const [SearchPara, setMySearchPata] = useState('')
    const BaseUrl = import.meta.env.VITE_API_URL;
    
    const GetAllChats = async () => {
        const response = await fetch(BaseUrl+`/api/messagebox/All_conversation/${OptionChoice}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        if (json) {
            setMyChatNumber(json.user)
        }
    }
    useEffect(() => {
        GetAllChats()
    }, [OptionChoice])
    const GetConversation = async (e) => {
        if (Admin._id) {
            const response = await fetch(BaseUrl+`/api/messagebox/get_messages/${Admin._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const json = await response.json()
            if (json) {
                const sortedMessages = json.messages.sort((a, b) => b._id.localeCompare(a._id));
                setMyChats(sortedMessages)
            }
        }
    }
    useEffect(() => {
        if (!Admin?._id) {
            return
        }
        console.log(Admin)
        GetConversation()
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
    const Searchbyticket = async (e) => {
        const response = await fetch(BaseUrl+`/api/messagebox/Search_Conversation/${SearchPara}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        if (json.success) {
            setMyChats(json.message)
        } else {
            toast('No Ticket Found')
        }
    }
    useEffect(() => {
        if (SearchPara.length >= 12) {
            Searchbyticket()
        } else if (SearchPara.length < 11) {
            GetConversation()
        }
    }, [SearchPara])
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
                        <input type="search" name="serach" id="serach" value={SearchPara} onChange={(e) => setMySearchPata(e.target.value)} placeholder='Search for ticket' />
                    </div>
                    <div>
                        <div className='dashboardoption'>
                            <div className='dashboardalltickets' onClick={() => setMyOptionChoice(undefined)}>
                                <img src={image8} alt="" />All tickets
                            </div>
                            {Admin.role !== "Member" && <div className='dashboardresolved' onClick={() => setMyOptionChoice("resolved")}>Resolved</div>}
                            {Admin.role !== "Member" && <div className='dashboardunresolved' onClick={() => setMyOptionChoice("Unresolved")}>Unresolved</div>}
                        </div>
                    </div>
                    {OptionChoice === undefined && chats?.map((msg, index) => {
                        const timeString = msg.message.time
                        const [datePart, timePart] = timeString.split(', ');
                        const [day, month, year] = datePart.split('/');
                        const formatted = `${month}/${day}/${year} ${timePart}`;
                        const localDate = new Date(formatted);
                        const diffHr = currenttime - localDate
                        console.log(diffHr)
                        return msg.role === 'user' ? <div className='messagebox' key={index}>
                            <div>
                                <div className='messageheader'>
                                    <div className='messageticketnumber'>
                                        <img src={image9} alt="ellipse" />
                                        Ticket #{localDate.toLocaleDateString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            year: 'numeric'
                                        })}-0{
                                            (localDate.toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                            })).split('/').join('') + timePart.slice(-5, -3)
                                        }
                                    </div>
                                    <div>
                                        <p className='messageposttime'>Posted at {localDate.toLocaleTimeString('en-IN', {
                                            timeZone: 'Asia/Kolkata', // convert to IST
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </div>
                                </div>
                                <div className='messagecontent'>
                                    <div className='messageportion'>{msg.message.text}</div>
                                    <div className='messagetimeinterval'>{String(Math.floor(diffHr / (1000 * 60 * 60))).padStart(2, '0')}:{String(Math.floor((diffHr % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}</div>
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
                                </div>
                                <div>
                                    Open Ticket
                                </div>
                            </div>
                        </div> : ""
                    })}
                    {OptionChoice && chatNumber?.map((msg, index) => {
                        const timeString = msg.message.time
                        const [datePart, timePart] = timeString.split(', ');
                        const [day, month, year] = datePart.split('/');
                        const formatted = `${month}/${day}/${year} ${timePart}`;
                        const localDate = new Date(formatted);
                        const diffHr = currenttime - localDate
                        return <div className='messagebox' key={index}>
                            <div>
                                <div className='messageheader'>
                                    <div className='messageticketnumber'>
                                        <img src={image9} alt="ellipse" />
                                        Ticket #{localDate.toLocaleDateString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            year: 'numeric'
                                        })}-0{
                                            (localDate.toLocaleDateString('en-US', {
                                                month: '2-digit',
                                                day: '2-digit',
                                            })).split('/').join('')
                                        }
                                    </div>
                                    <div>
                                        <p className='messageposttime'>Posted at {localDate.toLocaleTimeString('en-IN', {
                                            timeZone: 'Asia/Kolkata',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </div>
                                </div>
                                <div className='messagecontent'>
                                    <div className='messageportion'>{msg.message.text}</div>
                                    <div className='messagetimeinterval'>{String(Math.floor(diffHr / (1000 * 60 * 60))).padStart(2, '0')}:{String(Math.floor((diffHr % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')}</div>
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

                                </div>
                                <div>
                                    Open Ticket
                                </div>
                            </div>
                        </div>
                    })}
                </div>}
                {showoption === 'Contact' && <ContactCenter />}
                {showoption === 'Analytics' && <AnalyticPage />}
                {showoption === 'Chat' && <ChatBotPage />}
                {showoption === 'Team' && <TeamsPage />}
                {showoption === 'Setting' && <SettingsPage />}
            </div >
            <ToastContainer
            />
        </>
    )
}

export default MainDashbaord
