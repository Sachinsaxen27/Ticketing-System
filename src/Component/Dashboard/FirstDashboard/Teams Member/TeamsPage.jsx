import React, { useContext, useEffect, useRef, useState } from 'react'
import './TeamsPage.css'
import image1 from '../../../../Image/People.png'
import image2 from '../../../../Image/editing.png'
import image3 from '../../../../Image/delete.png'
import image4 from '../../../../Image/plus.png'
import CreateMemberForm from './Create Member/CreateMemberForm'
import TicketSystemAPI from '../../../../ContextAPI/TicketsystemApi'
function TeamsPage() {
    const [Showform, setMyShowForm] = useState(false)
    const formpop = useRef(null)
    const context = useContext(TicketSystemAPI)
    const { Admininfo, Memberinfo } = context
    const id = Memberinfo.admin ? Memberinfo.admin : Admininfo._id
    console.log(id)
    const [adminData, setMyadminData] = useState({})
    const [memberdata, setMyMemberData] = useState([])
    const[memberEdit,setMyMemberEdit]=useState()
    const BaseUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {

        const handleClickOutside = (event) => {
            console.log("event", event, Showform)
            if (formpop.current && !formpop.current.contains(event.target)) {
                setMyShowForm(false);
            }
        };

        if (Showform) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [Showform]);
    const HandleAdmin = async () => {
        const response = await fetch(BaseUrl+'/api/memberlogin/All_ADMIN_data', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'id': id
            }
        })
        const json = await response.json()
        setMyadminData(json)
    }
    const HandleMemberlist = async () => {
        const response = await fetch(BaseUrl+'/api/adminlogin/All_member_list', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'id': id
            }
        })
        const json = await response.json()
        setMyMemberData(json)
    }
    useEffect(() => {
        HandleAdmin()
        HandleMemberlist()
    }, [Showform])
    const MemberDelete = async (id) => {
        const response = await fetch(BaseUrl+`/api/adminlogin/deletemember/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        HandleMemberlist()
    }
    return (
        <>
            <div>
                <div className='Teamsheading'>
                    Teams
                </div>
                <div className='member_div'>
                    <table className='memebertable'>
                        <thead>
                            <tr >
                                <th className='thead-th' style={{ width: "100px" }} ></th>
                                <th className='thead-th' >Full Name</th>
                                <th className='thead-th' >Phone</th>
                                <th className='thead-th' >Email</th>
                                <th className='thead-th' >role</th>
                                <th className='thead-th' ></th>
                                <th className='thead-th' ></th>
                                <th className='thead-th' ></th>

                            </tr>
                        </thead>
                        <tbody style={{ paddingLeft: "10px" }}>
                            <tr>
                                <td className='memberuserprofile'><img src={image1} alt="user" /></td>
                                <td>{adminData.name}</td>
                                <td>{adminData.phone}</td>
                                <td>{adminData.email}</td>
                                <td>{adminData.role}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {memberdata.map((element, index) => {
                                return <tr key={index}>
                                    <td className='memberuserprofile'><img src={image1} alt="user" /></td>
                                    <td>{element.name}</td>
                                    <td>{element.phone ? element.phone : "+1 (000) 000-000"}</td>
                                    <td>{element.email}</td>
                                    <td>{element.role}</td>
                                    <td></td>
                                    <td></td>
                                    {Admininfo.role === 'Admin' ? <td className='editicons'>
                                        <img src={image2} alt="edit" onClick={()=>{setMyShowForm(true),setMyMemberEdit(element)}} />
                                        <img src={image3} alt="delete" onClick={() => MemberDelete(element._id)} />
                                    </td> : <td></td>}
                                </tr>
                            })}

                        </tbody>
                    </table>
                    {Memberinfo.role !== 'Member' ? <div className='buttondiv'>
                        <button className='buttonaddmember' onClick={(event) => setMyShowForm(true)}>
                            <img src={image4} alt="plus" />Add Team Members
                        </button>
                    </div> : ""}
                </div>
            </div>
            {Showform && <CreateMemberForm memberedit={memberEdit}  formpop={formpop} closeform={() => setMyShowForm(false)} />}
        </>
    )
}

export default TeamsPage
