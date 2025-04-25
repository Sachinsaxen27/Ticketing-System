import React from 'react'
import './FirstPart.css'
import image1 from '../../Image/image1.png'
import image2 from '../../Image/image2.png'
import image3 from '../../Image/image3.png'
import image4 from '../../Image/right-arrow.png'
import image5 from '../../Image/play-button.png'
import calendar from '../../Image/Calendar.png'
import SecondPart from './SecondPart'
import ThirdPart from '../ContainerSecond/ThirdPart'
import Footbar from '../Footbar/Footbar'
import Navbar from '.././Navbar/Navbar'
import ChatboxPage from '../Chatbox/ChatboxPage'
function FirstPart() {
    return (
        <>
            <Navbar />
            <div className='divFirstPart'>
                <div>
                    <div className='slideHeading'>
                        <h1 className='h1heading'>Grow Your Business Faster <br /> with Hubly CRM</h1>
                        <p className='categoryname'>Manage leads, automate workflows, and close deals effortlessly—all in one powerful <br /> platform.</p>
                    </div>
                    <div className='buttondivs'>
                        <button className='rightarrow'>Get Started <img src={image4} alt="arrow" /></button>
                        <button className='playbutton'><img src={image5} alt="play" /> Watch Video</button>
                    </div>
                </div>
                <div>
                    <div className='imagercontainer'>
                        <div>
                            <img src={image3} alt="" className='image3' />
                        </div>
                        <div className='calendarimagediv'>
                            <img src={calendar} alt="" className='calendar' />
                            <img src={image2} alt="" className='image2' />
                        </div>
                    </div>
                    <div className='slideHeadingsecond'>
                        <img src={image1} alt="image" style={{ width: '25rem' }} />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <SecondPart />
            <ThirdPart />
            <footer>
                <Footbar />
            </footer>
            <ChatboxPage />
        </>
    )
}

export default FirstPart
