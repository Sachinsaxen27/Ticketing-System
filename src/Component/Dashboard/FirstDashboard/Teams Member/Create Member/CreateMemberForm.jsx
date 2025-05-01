import React, { useContext, useEffect, useState } from 'react'
import './CreateMemberForm.css'
import TicketSystemAPI from '../../../../../ContextAPI/TicketsystemApi'
function CreateMemberForm(props) {
    const { memberedit } = props
    console.log(memberedit)
    const context = useContext(TicketSystemAPI)
    const { Admininfo, Memberinfo } = context
    const [credintial, setMycredintial] = useState({ name: memberedit.name || "", email: memberedit.email || "" })
    const [designation, setMydesignation] = useState("Member")
    const Updateprofile = async (e) => {
        const response = await fetch(`https://ticketsystem-backend-6gfl.onrender.com/api/adminlogin/edit_Profile/${memberedit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credintial.name, email: credintial.email, role: designation }),
            credentials:true
        });
        const json = await response.json()
        if (json.success) {
            console.log("Account Update Successfully", "success")
            setMycredintial({name:'', email: ""})
            props.closeform()
        } else {
            console.log(json.message)
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        if (memberedit) {
            Updateprofile()
        } else {
            const response = await fetch('https://ticketsystem-backend-6gfl.onrender.com/api/memberlogin/add_member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'id': Admininfo._id
                },
                body: JSON.stringify({ name: credintial.name, email: credintial.email, }),
                credentials:true
            });
            const json = await response.json()
            if (json.success) {
                console.log("Account Create Successfully", "success")
                setMycredintial({ name: "", email: "" })
                setMydesignation('Member')
                props.closeform()
            } else {
                console.log(json.message)
            }
        }
    }
    const handlechange = (e) => {
        setMycredintial({ ...credintial, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='createmembers' ref={props.formpop}>
                <div>
                    <h2>Add Team members</h2>
                    <p className='creatememberpara'>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New <br /> teammates may only be invited by the administrators.</p>
                </div>
                <form style={{ margin: "0px" }}>
                    <div className='formfield'>
                        <label htmlFor="name">User name</label>
                        <input type="text" name="name" id="username" value={credintial.name} placeholder='User name' onChange={handlechange} />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="email">Email ID</label>
                        <input type="email" name="email" id="useremail" placeholder='Email ID' value={credintial.email} onChange={handlechange} />
                    </div>
                    <div className='formfield'>
                        <label htmlFor="userDesignation">Designation</label>
                        <select value={designation} onChange={(e) => setMydesignation(e.target.value)}>
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </form>
                <div className='buttondiv'>
                    <button className='buttonCancelaction' onClick={props.closeform}>Cancel</button>
                    <button className='buttonSaveaction' onClick={handlesubmit}>Save</button>
                </div>
            </div>
        </>
    )
}

export default CreateMemberForm
