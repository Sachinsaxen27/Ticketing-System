import React, { useEffect, useState } from 'react'
import image1 from '../../Image/message.png'
import image2 from '../../Image/Ellipse 6.png'
import image3 from '../../Image/Close.png'
import image4 from '../../Image/Send.png'
import image5 from '../../Image/Cross.png'
import './ChatboxPage.css'
function ChatboxPage() {
    const [inputMessage, setMyinputMessage] = useState('')
    const [messagearr, setmyMessagearray] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usercredintial, setMyUsercredintial] = useState({ name: "", email: "", phone: "" })
    const [FetchMessage, setMyFetchMessage] = useState([])
    const [userInfo, setMyuserInfo] = useState()
    const [boximage, setMyboxImage] = useState(image1)
    const handleSendMessage = () => {
        if (!localStorage.getItem('user-token')) {
            const newMessage = {
                role: "user",
                text: inputMessage,
                type: 'text'
            };
            setmyMessagearray(prev => Array.isArray(prev) ? [...prev, newMessage] : [newMessage]);
            setMyinputMessage('');
            if (localStorage.getItem('user-token') === null) {
                setTimeout(() => {
                    setIsLoggedIn(true);
                    const adminMessage = {
                        role: "admin",
                        type: 'Form',
                        text: ""
                    };
                    setmyMessagearray(prev => [...prev, adminMessage]);
                }, 2000);
                clearTimeout()
            }
        } else {
            SendMessage()
        }
    };
    const SendMessage = async (e) => {
        // const id =FetchMessage.length>0?FetchMessage.find(msg => msg.role === 'admin')?.senderid._id:userInfo.AdminId
        console.log(FetchMessage)
        const response = await fetch('http://localhost:5000/api/messagebox/send_message', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userInfo._id, adminId:userInfo.AdminId, senderid: userInfo._id, senderModel: "userlogin", text: inputMessage, sender: 'user', role: 'user' })
        })
        const json = await response.json()
        if (json.success) {
            GetConversation()
            console.log(json)
            setMyinputMessage('')
        }
    }
    const handleshowintro = () => {
        let element = document.getElementById('welcomeback');
        const display = window.getComputedStyle(element).display;
        if (display === 'flex') {
            element.style.display = 'none';
        } else {
            element.style.display = 'flex';
        }
    }
    const handlemessagebox = () => {
        let element = document.getElementById('chatboxmessage');
        let element2 = document.getElementById('welcomeback');
        const display = window.getComputedStyle(element).display;
        // console.log(display);
        if (display === 'flex') {
            element.style.display = 'none';
            setMyboxImage(image1)
        } else {
            element.style.display = 'flex';
            element2.style.display = 'none'
            setMyboxImage(image5)
        }
    }
    const handlechangecred = (e) => {
        setMyUsercredintial({ ...usercredintial, [e.target.name]: e.target.value })
    }
    const GetConversation = async (e) => {
        const response = await fetch(`http://localhost:5000/api/messagebox/get_messages/${userInfo._id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json()
        if (json) {
            setMyFetchMessage(json.messages)
        }
    }
    const UserInformation = async (e) => {
        const response = await fetch('http://localhost:5000/api/userlogin/get_USERdata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("user-token")
            },
        });
        const json = await response.json()
        if (json) {
            setMyuserInfo(json)
        }
    }
    const UserloGin = async (e) => {
        // e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/userlogin/user_login?email=${localStorage.getItem('user-email')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
        });
        const json = await response.json()
        if (json) {
            localStorage.setItem('user-token', json.authtoken)
        }
    }
    const handleSumbitfomr = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('user-token')===null) {

            const response = await fetch('http://localhost:5000/api/userlogin/user_signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ name: usercredintial.name, email: usercredintial.email, phone: usercredintial.phone })
            });
            const json = await response.json()
            if (json.success) {
                localStorage.setItem('user-email', usercredintial.email)
            }
            else {
                UserloGin()

            }
        } else {
            UserloGin()
        }
    }
    useEffect(() => {
        if (localStorage.getItem('user-token')) {
            UserInformation()
        
        }
    }, [])
    useEffect(() => {
        if (userInfo?._id) {
            GetConversation()
        }
    }, [userInfo])
    useEffect(()=>{
        if(localStorage.getItem('user-email')){
            UserloGin()
        }
    },[])
    return (
        <>
            <div>
                <div className='chatboxpop' id='welcomeback'>
                    <img src={image2} alt="user" className='allienuser' />
                    <div className='welcomecontext' >
                        <div className='closebutton'>
                            <img src={image3} alt="close" onClick={handleshowintro} />
                        </div>
                        👋 Want to chat about Hubly? I'm <br /> an chatbot here to help you find <br /> your way.
                    </div>
                </div>
                <div className='chatboxborde' onClick={handlemessagebox}>
                    <img src={boximage} alt="message" />
                    {/* <img src={image1} alt="message" /> */}
                </div>
            </div>
            <div className='messagecard' id='chatboxmessage' style={{ display: 'none' }}>
                <div className='messagecardheader'>
                    <img src={image2} alt="icond" />
                    Hubly
                </div>
                <div className='messagearea'>
                    <div className="chat-container">
                        {(localStorage.getItem('user-token') === null) && messagearr?.map((msg, index) => (
                            <div key={index} className={`chatbotlanding ${msg.role === 'user' ? 'user' : 'admin'}`}>
                                {msg.type === 'text' && <p>{msg.text}</p>}
                                {((msg.type === 'Form' && isLoggedIn) && !localStorage.getItem('user-token')) &&
                                    <div className='tempraroychat'>
                                        <img src={image2} alt="" />
                                        <div className='teamsmembermessage'>
                                            <form className='formfill'>
                                                <div style={{ fontWeight: "600" }}>Introduction  Yourself</div>
                                                <div className='inputchatformoption'>
                                                    <label htmlFor="name">Your Name</label>
                                                    <input type="text" name="name" id="name" value={usercredintial.name} placeholder='Your Name' onChange={handlechangecred} />
                                                </div>
                                                <div className='inputchatformoption'>
                                                    <label htmlFor="phone">Your Phone</label>
                                                    <input type="number" name="phone" id="phone" value={usercredintial.phone} placeholder='+1 (000) 000-000' onChange={handlechangecred} />
                                                </div>
                                                <div className='inputchatformoption'>
                                                    <label htmlFor="youremail">Your Email</label>
                                                    <input type="email" name="email" id="email" value={usercredintial.email} placeholder='example@gmail.com' onChange={handlechangecred} />
                                                </div>
                                            </form>
                                            <div className='buttonsumbitformchatbox'><button className='thankyou' onClick={handleSumbitfomr}>Thank You!</button></div>
                                        </div>
                                        {/* <div className='teamsmembermessage formfill'>Thank you</div> */}
                                    </div>}
                            </div>
                        ))}
                        {FetchMessage.map((msg, index) => {
                            return <div key={index} className={`chatbotlanding ${msg.role === 'user' ? 'user' : 'admin'}`}>
                                <p>{msg.message.text}</p>
                            </div>
                        })}
                    </div>
                    <div className='messageinput'>
                        <textarea name="messagebox" id="messagebox2" cols="45" rows="3" onChange={(e) => setMyinputMessage(e.target.value)} value={inputMessage} placeholder='Write a message'></textarea>
                        <img src={image4} alt="send" onClick={handleSendMessage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatboxPage
