import React, { useContext, useState } from 'react'
import cloud from '../../Image/cloud.png'
import image from '../../Image/image 1.png'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import TicketsystemApi from '../../ContextAPI/TicketsystemApi'
function LoginPage() {
    const [credintial, setMycredintial] = useState({ email: "", password: "" })
    const navigate=useNavigate()
    const context=useContext(TicketsystemApi)
    const{getAdmininfo,getMemberinfo}=context
    // localStorage.clear()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://ticketsystem-backend-6gfl.onrender.com/api/adminlogin/admin_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credintial.email, password: credintial.password }),
            credentials:true
        });
        const json = await response.json()
        if (json.success) {
            console.log(json)
            if(json.role==='admin'){
                localStorage.setItem('authtoken', json.authtoken)
                getAdmininfo()
            }
            if(json.role==='member'){
                localStorage.setItem('member-token',json.authtoken)
                getMemberinfo()
            }
            navigate('/dashboard')
        }
        else {
            console.log('error')
        }
    }
    const handleChange = (e) => {
        setMycredintial({ ...credintial, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='loginStartingdiv'>
                <div className='divheadingtag'>
                    <img src={cloud} alt="cloud" />
                    <h1 style={{ margin: '0px', padding: '0px' }}>Hubly</h1>
                </div>
                <div className='formdiv'>
                    {/* <div style={{margin:'auto'}}> */}
                    <div className='insideform'>
                        <h1>Sign in to your Plexfiy</h1>
                        <div>
                            <form>
                                <div className='fomrinputtag'>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name='email' id='email'value={credintial.email}onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" value={credintial.password} onChange={handleChange}/>
                                </div>
                                <button className='loginbutton'onClick={handlesubmit}>Log In</button>
                            </form>
                        </div>
                        <div className='divforgatsignup' style={{ textDecoration: 'underline' }}>
                            Forgot password?
                        </div>
                        <div className='divforgatsignup'>
                            Don't have an account? <Link to='/signup'>Sign up</Link>
                        </div>
                    </div>
                    <div style={{ color: '#676B5F' }}>
                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                    </div>
                </div>
                <div>
                    <img src={image} alt="image" style={{ height: '43.2rem', width: '25rem' }} />
                </div>
            </div>

        </>
    )
}

export default LoginPage
