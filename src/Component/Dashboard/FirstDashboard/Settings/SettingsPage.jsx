import React, { useContext, useEffect, useState } from 'react'
import './SettingsPage.css'
import image1 from '../../../../Image/info.png'
import TicketSystemAPI from '../../../../ContextAPI/TicketsystemApi'
import { useNavigate } from 'react-router-dom'
function SettingsPage() {
    const context = useContext(TicketSystemAPI)
    const navigation=useNavigate()
    const { Admininfo, Memberinfo } = context
    const value = Object.values(Admininfo).length > 0 ? Admininfo : Memberinfo
    const [credintial, setMycredintial] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' })
    // console.log(Object.values(Memberinfo).length,Memberinfo)
    console.log(value)
    let firstname = ''
    let lastname = ''
    useEffect(() => {
        let fullname = value.name || ''
        if (fullname.includes(" ")) {
            [firstname, lastname] = fullname.split(" ");
        } else {
            firstname = fullname;
        }
        setMycredintial({ firstname: firstname || "", lastname: lastname || "", email: value.email || "", password: value.password || "", confirmpassword: value.password || '' })
    }, [value])
    const handleshow = (value) => {
        let val = document.getElementById(value)
        if (val.style.display === 'none') {
            val.style.display = 'block'
        } else {
            val.style.display = 'none'
        }
    }
    const handlechange = (e) => {
        setMycredintial({ ...credintial, [e.target.name]: e.target.value })
    }
    const Updateprofile = async(e) => {
        let finalname=credintial.firstname+' '+credintial.lastname
        e.preventDefault()
        const response = await fetch(`https://ticketsystem-backend-8vh3.onrender.com/api/adminlogin/edit_Profile/${value._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name:finalname, email: credintial.email,password:credintial.password,role:credintial.role}),
   
        });
        const json = await response.json()
        if (json.success) {
            console.log("Account Update Successfully", "success")
            setMycredintial({ firstname:"", lastname:"", email:"", password:"", confirmpassword:'' })
            localStorage.clear()
            navigation('/')
        } else {
            console.log(json.message)
        }
    }
    console.log(value.name)
    return (
        <>
            <div>
                <div className='settingheading'>
                    Settings
                </div>
                <div className='div'>
                    <div className='diveditprofile'>
                        <div >
                            Edit Profile
                        </div>
                    </div>
                    <div>
                        <form>
                            <div className='formfieldinput'>
                                <label htmlFor="firstname">First Name</label>
                                <input type="text" name="firstname" id="firstname" placeholder='First Name' value={credintial.firstname} onChange={handlechange} />
                            </div>
                            <div className='formfieldinput'>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" id="lastname" placeholder='Last Name' value={credintial.lastname} onChange={handlechange} />
                            </div>
                            <div className='formfieldinput'>
                                <label htmlFor="email">Email</label>
                                <div className='infodiv'>
                                    <input type="text" name="email" id="emailid" placeholder='Email' value={credintial.email} onChange={handlechange} />
                                    <img src={image1} alt="info" onMouseEnter={() => handleshow('pop1')} />
                                    <div className='popup' id='pop1' onMouseLeave={() => handleshow('pop1')}>User will logged out immediately</div>
                                </div>

                            </div>
                            <div className='formfieldinput'>
                                <label htmlFor="password">Password</label>
                                <div className='infodiv'>
                                    <input type="password" name="password" id="password" placeholder='Password' value={credintial.password} onChange={handlechange} />
                                    <img src={image1} alt="info" onMouseEnter={() => handleshow('pop2')} />
                                    <div className='popup' id='pop2' onMouseLeave={() => handleshow('pop2')}>User will logged out immediately</div>
                                </div>
                            </div>
                            <div className='formfieldinput'>
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <div className='infodiv'>
                                    <input type="password" name="confirmpassword" id="confirmpassword" placeholder='Confirm Password' onChange={handlechange} value={credintial.confirmpassword} />
                                    <img src={image1} alt="info" onMouseEnter={() => handleshow('pop3')} />
                                    <div className='popup' id='pop3' onMouseLeave={() => handleshow('pop3')}>User will logged out immediately</div>
                                </div>
                            </div>
                        </form>
                        <div className='buttonsave'>
                            <button className='buttonSaveaction' onClick={Updateprofile}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage
