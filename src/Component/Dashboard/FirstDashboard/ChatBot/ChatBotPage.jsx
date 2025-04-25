import React, { useState } from 'react'
import './ChatBotPage.css'
import image1 from '../../../../Image/Iconstatus.png'
import image2 from '../../../../Image/Send.png'
import image3 from '../../../../Image/pencil.png'
import image4 from '../../../../Image/Close.png'
function ChatBotPage() {
    const para = ("👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.")
    const res = para.trim().split(' ').length
    const [Customize, setMyCustomize] = useState({ headercolor: "#33475B", bgColor: "#EEEEEE", welcomemessage: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way." })
    const [messageoption, setMymessageoption] = useState({ firstmessage: " How can i help you?", secondmessage: "Ask me anything!" })
    const handlechange = (e) => {
        setMymessageoption({ ...messageoption, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div>
                <div className='chatbotheading'>Chat Bot</div>
                <div className='chatcustomize'>
                    <div className='chatboxborder' style={{ backgroundColor: `${Customize.bgColor}` }}>
                        <div className='chatbox'>
                            <div className='chatboxheader' style={{ backgroundColor: `${Customize.headercolor}` }}>
                                <img src={image1} alt="icon" />
                                Hubly
                            </div>
                        </div>
                        <div className='messageareadiv'>
                            <div className='usermessagearea'>
                                <img src={image1} alt="icon" />
                                <div style={{ marginLeft: '10px' }}>
                                    <div className='textrecive'>{messageoption.firstmessage}</div>
                                    <div className='textrecive'>{messageoption.secondmessage}</div>
                                </div>
                            </div>
                            <div className='adminmessagearea'>
                                <div className='adminmessage1' >
                                    <div className='textrecive'>Hey</div>
                                    <div className='textrecive'>How can i help you?</div>
                                    <div className='textrecive'>Ask me Anything!</div>
                                </div>
                            </div>
                            <div className='textareadiv'>
                                <textarea name="message" id="message" cols="46" rows="3" placeholder='Write a message'></textarea>
                                <img src={image2} alt="send" />
                            </div>
                        </div>
                        <div className='welcome'>
                            <img src={image1} alt="user" className='usericon' />
                            <div className='welcomeintro'>
                                <div className='welcomeclose'>
                                    <img src={image4} alt="close" />
                                </div>
                                👋 Want to chat about Hubly? I'm <br /> an chatbot here to help you find <br /> your way.
                            </div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <div className='chatbotcustomizearea'>
                            <h5>Header Color</h5>
                            <div style={{ display: "flex" }}>
                                <div className='coloroption' style={{ backgroundColor: '#FFFFFF', border: '1px solid #EEEEEE', cursor: 'pointer' }} onClick={() => setMyCustomize({ headercolor: "#FFFFFF" })}></div>
                                <div className='coloroption' style={{ backgroundColor: "#000000", cursor: 'pointer' }} onClick={() => setMyCustomize({ headercolor: "#000000" })}></div>
                                <div className='coloroption' style={{ backgroundColor: "#33475B", cursor: 'pointer' }} onClick={() => setMyCustomize({ headercolor: "#33475B" })}></div>
                            </div>
                            <div className='coloroptionanswerdiv'>
                                <div className='showcolor'></div>
                                <input value={Customize.headercolor} readOnly />
                            </div>
                        </div>
                        <div className='chatbotcustomizearea'>
                            <h5>
                                Custom Background Color
                            </h5>
                            <div style={{ display: "flex" }}>
                                <div className='coloroption' style={{ backgroundColor: '#FFFFFF', border: '1px solid #EEEEEE', cursor: "pointer" }} onClick={() => setMyCustomize({ bgColor: "#FFFFFF" })}></div>
                                <div className='coloroption' style={{ backgroundColor: "#000000", cursor: "pointer" }} onClick={() => setMyCustomize({ bgColor: "#000000" })}></div>
                                <div className='coloroption' style={{ backgroundColor: "#EEEEEE", cursor: "pointer" }} onClick={() => setMyCustomize({ bgColor: "#EEEEEE" })}></div>
                            </div>
                            <div className='coloroptionanswerdiv'>
                                <div className='showcolor' style={{ backgroundColor: '#EEEEEE', border: '1px solid #EEEEEE' }}></div>
                                <input value={Customize.bgColor} readOnly />
                            </div>
                        </div>
                        <div className='chatbotcustomizearea'>
                            <h5>Customize Messages</h5>
                            <div className='messageediting'>
                                <input type="text" className='messagecustomize' id='firstmessage' name='firstmessage' onChange={handlechange} value={messageoption.firstmessage} />
                                <label htmlFor="firstmessage">
                                    <img src={image3} alt="pencil" />
                                </label>
                            </div>
                            <div className='messageediting'>
                                <input type="text" className='messagecustomize' id='secondmessage' name='secondmessage' onChange={handlechange} value={messageoption.secondmessage} />
                                <label htmlFor="secondmessage">
                                    <img src={image3} alt="pencil" />
                                </label>

                            </div>

                        </div>
                        <div className='chatbotcustomizearea'>
                            <h5>Introduction Form</h5>
                            <form>
                                <div className='editformfield'>
                                    <label htmlFor="yourname">Your Name</label>
                                    <input type="text" id='yourname' name='yourname' placeholder='Your Name' />
                                </div>
                                <div className='editformfield'>
                                    <label htmlFor="yourphone">Your Phone</label>
                                    <input type="text" id='yourphone' name='yourphone' placeholder='+1 (000) 000-000' />
                                </div>
                                <div className='editformfield'>
                                    <label htmlFor="youremail">Your Email</label>
                                    <input type="text" id='youremail' name='youremail' placeholder='example@gmail.com' />
                                </div>
                                <button className='editformbutton'>Thank You!</button>
                            </form>
                        </div>
                        <div className='chatbotcustomizearea'>
                            <h5>Welcome Message </h5>
                            <div className='customizewelcome'>
                                <div className='charactercount'>{res - 1}/50</div>
                                <div className='welcometext'>
                                    <div>👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.</div>
                                    <img src={image3} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='chatbotcustomizearea'>
                            <h5>Missed Chat Timmer</h5>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div className='chattimmer'>
                                    <div>00</div>
                                    <div>:</div>
                                    <div>10</div>
                                    <div>:</div>
                                    <div>00</div>
                                </div>
                                <div>
                                    <button className='buttonsavetime'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBotPage
