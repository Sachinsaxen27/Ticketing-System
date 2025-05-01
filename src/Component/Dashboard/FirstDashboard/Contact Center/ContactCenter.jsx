import React, { useContext, useEffect, useState } from 'react'
import './ContactCenter.css'
import image1 from '../../../../Image/People.png'
import image2 from '../../../../Image/img.png'
import image3 from '../../../../Image/Vector.png'
import image4 from '../../../../Image/contact.png'
import image5 from '../../../../Image/phone.png'
import image6 from '../../../../Image/mail.png'
import image7 from '../../../../Image/ticket.png'
import image8 from '../../../../Image/arrow.png'
import image9 from '../../../../Image/sendcircle.png'
import TicketSystemAPI from '../../../../ContextAPI/TicketsystemApi'
function ContactCenter() {
    const context = useContext(TicketSystemAPI)
    const { Admininfo, Memberinfo } = context
    const [userList, setMyuserList] = useState([])
    const [OpenUser, setMyOpenuser] = useState()
    const [Memberlist, setMyMemberList] = useState([])
    const [Showpopup, setMyShowpopUp] = useState({ status: false, id: '' })
    const [messagefetch, setMyMessageFetch] = useState([])
    const [inputmessage, setMyInputMessage] = useState()
    const [showresolved, setMyShowResolved] = useState({status:false,text:""})
    const [logOff, setMyLogOff] = useState(true)
    const [TicketNumber, setMyTicketNumber] = useState({ year: "", date: '' })
    let conversationID = ''
    const Admin = (Admininfo && Object.keys(Admininfo).length > 0) ? Admininfo : Memberinfo;
    let model = (Admininfo && Object.keys(Admininfo).length > 0) ? "adminlogin" : 'memberlogin'
    let role = (Admininfo && Object.keys(Admininfo).length > 0) ? "admin" : 'member'
    const [ChatStatus, setMyChatStatus] = useState('This chat is assigned to new team member. you no longer have access ')
    const optionlist = (value) => {
        let opt = document.getElementById(value)
        if (opt.style.display === 'none') {
            opt.style.display = 'block'
        }
        else {
            opt.style.display = 'none'
        }
    }
    const BaseUrl = import.meta.env.VITE_API_URL;

    const FetchChatUser = async (e) => {
        const response = await fetch(BaseUrl+'/api/adminlogin/allchats_Available_inAdmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "id": Admin._id
            },
        })
        const json = await response.json()
        if (json.success) {
            setMyuserList(json.user)
        }
        else {
            console.log(json)
        }
    }
    const HandleMemberlist = async () => {
        const response = await fetch(BaseUrl+'/api/adminlogin/All_member_list', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'id': Admininfo._id
            }
        })
        const json = await response.json()
        setMyMemberList(json)
    }
    const AssignChange = async (val) => {
        const response = await fetch(BaseUrl+`/api/adminlogin/assignchat/${conversationID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adminId: val, userId: OpenUser._id })
        })
        const json = await response.json()
        if (json.success) {
            // console.log("success")
            setMyChatStatus('This chat is assigned to new team member. you no longer have access')
            setMyShowpopUp({ status: false, id: '' })
            setMyMessageFetch([])
            setMyOpenuser()
            setMyLogOff(false)
        }
    }
    const StatusChange = async (val) => {
        const response = await fetch(BaseUrl+`/api/adminlogin/conversationstatus/${conversationID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: val })
        })
        const json = await response.json()
        if (json.success) {
            setMyChatStatus('This chat has been resolved')
            setMyShowResolved({status:false,text:''})
            setMyLogOff(false)
        }
    }
    const GetConversation = async (e) => {
        const response = await fetch(BaseUrl+`/api/messagebox/get_messages/${OpenUser._id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        // console.log(json)
        if (json) {
            console.log(json)
            setMyMessageFetch(json.messages)
            // console.log(json.messages)
        }
    }
    useEffect(() => {
        HandleMemberlist()
        FetchChatUser()
    }, [])
    useEffect(() => {
        if (OpenUser?._id) {
            GetConversation()
        }
    }, [OpenUser])
    const SendMessage = async (e) => {
        e.preventDefault()
        const response = await fetch(BaseUrl+'/api/messagebox/send_message', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: OpenUser._id, adminId: Admin._id, senderid: Admin._id, senderModel: model, text: inputmessage, sender: role, role: role }),
            
        })
        const json = await response.json()
        if (json) {
            // console.log(json)
            GetConversation()
            setMyInputMessage('')
        }
    }
    useEffect(() => {
        if (OpenUser) {
            const timeString = new Date(OpenUser.time)
            console.log(timeString)

            setMyTicketNumber({
                year: timeString.getFullYear(),
                date: '0' + String(timeString.getMonth() + 1) + String(timeString.getDate())
            })
        }
    }, [OpenUser])

    const localdate = new Date()
    return (
        < >
            <div style={{ display: 'flex' }}>
                <div className='contactcenterdiv'>
                    <div className='contactheading'>
                        Contact Center
                    </div>
                    <div className='contactcenterlist'>
                        <div className='chats'>
                            <div>
                                Chats
                            </div>
                        </div   >
                        <div>
                            {userList ? userList.map((user, index) => {
                                return <div className='chatlist' key={index} onClick={() => { setMyOpenuser(user) }}>
                                    <img src={image1} alt="user" className='userimage' />
                                    <div className='userdetails'>
                                        <h3>{user.name}</h3>
                                    </div>
                                </div>
                            }) : ""}
                        </div>
                    </div>
                </div>
                {OpenUser && <div>
                    <div className='chatarea'>
                        <div className='divchatheader'>
                            <h3>Ticket# {TicketNumber.year}-0{TicketNumber.date}</h3>
                            <img src={image3} alt="Home" />
                        </div>
                        <div className='divchatarea'>
                            <div>
                                {localdate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}
                            </div>
                            <div>
                                <div className="chat-container" style={{ maxHeight: '423px' }}>
                                    {messagefetch ? messagefetch.map((msg, index) => {

                                        conversationID = msg.conversationID
                                        return <div key={index} className={`chat-message ${msg.role === 'user' ? 'user' : 'admin'}`}>
                                            <img src={image1} alt="user" className='userimage' />
                                            <div className='userdetails' style={{ alignItems: msg.role === 'user' ? "flex-start" : "flex-end" }} >
                                                <h3>{msg.message.sender}</h3>
                                                <p>{msg.message.text}</p>

                                            </div>
                                        </div>
                                    }) : ""}
                                </div>
                                {logOff ? <div style={{ paddingLeft: '10px', paddingRight: '10px', paddingBottom: "4px" }}>
                                    <textarea name="message" id="mess" cols="80" rows="8" onChange={(e) => setMyInputMessage(e.target.value)} onKeyDown={(event)=>event.key==='Enter'&& SendMessage()} value={inputmessage} placeholder='Type here'></textarea>
                                    <img src={image9} alt="send" className='sendcircle' onClick={SendMessage} />
                                </div> : <div style={{ width: "40rem", textAlign: 'center', marginBottom: "10px", marginTop: '10px', color: '#a89898', fontWeight: '400' }}>
                                    {ChatStatus}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>}
                {OpenUser && <div className='detailsdiv' >
                    <div className='chatlogo'>
                        <img src={image1} alt="user" />Chat
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <h3 className='detailsh3'>Details</h3>
                        <div className='userdetailsright' style={{ justifyContent: 'flex-start' }}>
                            <img src={image4} alt="contact" />
                            {OpenUser.name}
                        </div>
                        <div className='userdetailsright' style={{ justifyContent: 'flex-start' }}>
                            <img src={image5} alt="phone" />
                            {OpenUser.phone}
                        </div>
                        <div className='userdetailsright' style={{ justifyContent: 'flex-start' }}>
                            <img src={image6} alt="mail" />
                            {OpenUser.email}
                        </div>
                    </div>
                    {Admin.role !== 'Member' && <div>
                        <h3 className='detailsh3'>Teammates</h3>
                        <div>
                            <div className="userdetailsright" style={{ cursor: 'pointer' }} onClick={() => optionlist('memberlistoption')}>
                                <div>
                                    <img src={image1} alt="people" style={{ margin: "0px 25px 0px 5px" }} />
                                    Joe Doe
                                </div>
                                <img src={image8} alt="arrow" style={{ margin: "0px", marginRight: '15px' }} />
                            </div>
                            <div id='memberlistoption' style={{ marginTop: '15px', marginBottom: '15px', display: 'none' }}>
                                <div style={{ borderRadius: "12px" }}>
                                    {Memberlist.map((member, index) => {
                                        let border = {
                                            borderTopLeftRadius: index === 0 ? '12px' : "0px",
                                            borderTopRightRadius: index === 0 ? '12px' : '0px',
                                            borderBottomLeftRadius: index === Memberlist.length - 1 ? '12px' : "0px",
                                            borderBottomRightRadius: index === Memberlist.length - 1 ? '12px' : "0px",
                                            paddingLeft: '4px'
                                        }
                                        return <div key={index}>
                                            <div className='ticketstatus' style={border} onClick={() => setMyShowpopUp({ status: true, id: member._id })}>
                                                <img src={image1} alt="people" style={{ margin: "0px 25px 0px 5px" }} />
                                                {member.name}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div>
                        <div className="userdetailsright" style={{ cursor: 'pointer' }} onClick={() => optionlist('ticketstatusoption')}>
                            <div>
                                <img src={image7} alt="" />
                                Ticket Status
                            </div>
                            <img src={image8} alt="arrow" style={{ margin: "0px", marginRight: '15px' }} />

                        </div>
                        <div id='ticketstatusoption' style={{ marginTop: '15px', display: 'none' }}>
                            <div className='ticketstatus' style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} onClick={() => setMyShowResolved({status:true,text:"resolved"})}>Resolved</div>
                            <div className='ticketstatus' style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} onClick={() => setMyShowResolved({status:true,text:"unresolved"})}>Unresolved</div>
                        </div>
                    </div>
                </div>}
            </div>
            {Showpopup.status && <div className='assignpopup'>
                <div>
                    Chat would be assigned to Different team member
                </div>
                <div className='assignpopupbuttondiv'>
                    <button className='assignpopbuttoncancel' onClick={() => setMyShowpopUp({ status: false, id: '' })}>Cancel</button>
                    <button className='assignpopbuttonconfirm' onClick={() => AssignChange(Showpopup.id)}>Confirm</button>
                </div>
            </div>}
            {showresolved.status && <div className='assignpopup'>
                <div>
                    Chat will be closed
                </div>
                <div className='assignpopupbuttondiv'>
                    <button className='assignpopbuttoncancel' onClick={() => setMyShowResolved({status:false,text:""})}>Cancel</button>
                    <button className='assignpopbuttonconfirm' onClick={() => StatusChange(showresolved.text)}>Confirm</button>
                </div>
            </div>}
        </>
    )
}

export default ContactCenter
