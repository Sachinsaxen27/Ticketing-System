import React, { useState } from 'react'
import cloud from '../../Image/cloud.png'
import image from '../../Image/image 1.png'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import '../Login/LoginPage.css'
import AlertPage from '../alert/AlertPage'
function Signup() {
    const navigation=useNavigate()
    const [credintial, setMycredintial] = useState({ firstname: "", lastname: "", password: "", email: "", confirmpassword: "", phone: '' })
    const handleChange = (e) => {
        console.log(e)
        setMycredintial({ ...credintial, [e.target.name]: e.target.value })
    }
    const [error, setMyerror] = useState(false)
    const BaseUrl = import.meta.env.VITE_API_URL;
    const handlesubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            let fullname = credintial.firstname + ' ' + credintial.lastname
            const response = await fetch(BaseUrl+'/api/adminlogin/admin_Registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: fullname, phone: credintial.phone,email: credintial.email, password: credintial.password})
            });
            const json = await response.json()
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                console.log("Account Create Successfully", "success")
                navigation('/login')
                setMycredintial({ firstname: "", lastname: "", password: "", email: "", confirmpassword: "", phone: '' })
            }
        } else {
            setMyerror(true)
        }
    }
    return (
        <>

            <div className='loginStartingdiv'>
                <div className='divheadingtag'>
                    <img src={cloud} alt="cloud" />
                    <h1 style={{ margin: '0px', padding: '0px' }}>Hubly</h1>
                </div>
                <div className='formdiv'>
                    <div className='insideform'>
                        <div className='accountheading'>
                            <h1>Create an account</h1>
                            <Link to='/login'>Sign in instead</Link>
                        </div>
                        <div>
                            <form>
                                <div className='fomrinputtag'>
                                    <label htmlFor="firstname">First name</label>
                                    <input type="text" value={credintial.firstname} name='firstname' id='firstname' onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="lastname">last name</label>
                                    <input type="text" value={credintial.lastname} name='lastname' id='lastname' onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" value={credintial.email} name="email" id="email" onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" value={credintial.phone} name="phone" id="phone" onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" value={credintial.password} name="password" id="password" onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag'>
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                    <input type='password' name="confirmpassword" value={credintial.confirmpassword} id="confirmpassword" onChange={handleChange} />
                                </div>
                                <div className='fomrinputtag checkboxdiv'>
                                    <input type="checkbox" name="checkid" id="checkid" />By creating an account, I agree to our Terms of use
                                    and Privacy Policy
                                </div>
                                <button className='loginbutton' style={{ fontSize: '18px', cursor: 'pointer' }} onClick={handlesubmit}>Create an account</button>
                            </form>
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
            {error && <AlertPage text='Password not match' color='#dc3545' clearerror={setMyerror} />}
        </>
    )
}

export default Signup
