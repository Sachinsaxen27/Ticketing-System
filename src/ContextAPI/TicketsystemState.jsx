import React, { useEffect, useState } from 'react'
import TicketsystemApi from './TicketsystemApi'
function TicketsystemState({ children }) {
    const [Admininfo, setMyAdmininfo] = useState({})
    const[chatbotheader,setMychatbotheader]=useState({ headercolor: "#33475B", bgColor: "#EEEEEE", welcomemessage: "👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.",firstmessage: " How can i help you?", secondmessage: "Ask me anything!"  })
    const [Memberinfo, setMyMemberinfo] = useState({})
    const BaseUrl = import.meta.env.VITE_API_URL;

    const getAdmininfo = async () => {
        const response = await fetch(BaseUrl+"/api/adminlogin/get_admin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("authtoken")
            },
        });
        const json = await response.json()
        if (json) {
            setMyAdmininfo(json)
        }
    }
    const getMemberinfo = async () => {
        console.log('hit')
        const response = await fetch(BaseUrl+"/api/memberlogin/get_member_data", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("member-token")
            },
        });
        const json = await response.json()
        if (json) {
            setMyMemberinfo(json)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            getAdmininfo()
        }
        if (localStorage.getItem('member-token')) {
            getMemberinfo()
        }
    }, [])

    return (
        <>
            <TicketsystemApi.Provider value={{ getAdmininfo, Admininfo, getMemberinfo, Memberinfo,setMychatbotheader,chatbotheader}}>
                {children}
            </TicketsystemApi.Provider>
        </>
    )
}

export default TicketsystemState;
