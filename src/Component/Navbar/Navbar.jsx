import React from 'react'
import cloud from '../../Image/cloud.png'
import './navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <>
            <div id='navbarmaindiv'>
                <div className='divlogo1'>
                    <img src={cloud} alt="Hubly" id='image1' />
                    <h1 className='headingname'>
                        Hubly
                    </h1>
                </div>
                <div className='divloginsignupbutton'>
                <Link to='/login'><button className='buttonlogin'>Login</button></Link>
                   <Link to='/signup'> <button className='buttonsignup'>Sign up</button></Link>
                </div>

            </div>
        </>
    )
}

export default Navbar
