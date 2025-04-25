import React from 'react'
import './ThirdPart.css'
import iconimage from '../../Image/icon.png'
import reactangle from '../../Image/Rectangle 6226.png'
import reactangle1 from '../../Image/Rectangle 6227.png'
import reactangle2 from '../../Image/Rectangle 6228.png'
import vector1 from '../../Image/Vector 290.png'
import vector2 from '../../Image/Vector 291.png'
import vector3 from '../../Image/Vector 292.png'
import check from '../../Image/Check icon.png'
function ThirdPart() {
    return (
        <>
            <div className='thirdpartcontainer'>
                <div className='headincontainer'>
                    <h1>At its core, Hubly is a robust CRM <br /> solution.</h1>
                    <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks— <br />saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly <br /> adapts to your needs, giving you the tools to scale efficiently.</p>
                </div>
                <div className='thirdparsecondcontainer'>
                    <div className='divblockcontent'>
                        <div>
                            <h5 className='headingblock'>MULTIPLE PLATFORMS TOGETHER!</h5>
                            <p className='contentpara'>Email communication is a breeze with our fully integrated, drag & drop <br /> email builder.</p>
                        </div>
                        <div>
                            <h5 className='headingblock' style={{ fontSize: '18px' }}>CLOSE</h5>
                            <p className='contentpara'>Capture leads using our landing pages, surveys, forms, calendars, inbound phone <br /> system & more!</p>
                        </div>
                        <div>
                            <h5 className='headingblock' style={{ fontSize: '18px' }}>NURTURE</h5>
                            <p className='contentpara'>Capture leads using our landing pages, surveys, forms, calendars, inbound <br /> phone system & more!</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <img src={iconimage} alt="" className='iconimage' />
                        <div className='reactangleblock'>
                            <div className='divblockreactangle'>
                                <p>CAPTURE</p>
                                <img src={vector1} alt='vector' className='vectorline' />
                                <img src={reactangle} alt="" />
                            </div>
                            <div className='divblockreactangle'>
                                <p>NURTURE</p>
                                <img src={vector2} alt='vector' className='vectorline' />
                                <img src={reactangle1} alt="" style={{ position: 'relative', right: '3px', top: '-1px' }} />
                            </div>
                            <div className='divblockreactangle'>
                                <p>CLOSE</p>
                                <img src={vector3} alt='vector' className='vectorline' style={{ left: "53px" }} />
                                <img src={reactangle2} alt="" style={{ position: 'relative', left: '24px', top: "-2px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='thirdpartcontainer'>
                <div className='headincontainer'>
                    <h1>We have plans for everyone!.</h1>
                    <p>We started with a strong foundation, then simply built all of the sales <br /> and marketing tools ALL businesses need under one platform.</p>
                </div>
                <div className='fourtpartcontainer'>
                    <div className='card'>
                        <div>
                            <h2 style={{margin:'0px',padding:'0px',fontSize:'30px'}}>STARTER</h2>
                            <p style={{margin:'0px',padding:'0px', marginTop:'10px',marginBottom:'20px'}}>Best for local businesses needing to improve their online <br /> reputation.</p>
                        </div>
                        <div>
                            <div className='pricecontainer'>
                                <h1 className='priceh1'>$199</h1><p >/monthly</p>
                            </div>
                            <div className='listcontainer'>
                                <h6 >What's included</h6>
                                <div className='list'>
                                    <img src={check} alt="" />Unlimited Users
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />GMB Messaging
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />Reputation Management
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />GMB Call Tracking
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />24/7 Award Winning Support
                                </div>
                            </div>
                        </div>
                        <button className='buttonsignupforstarter'>SIGN UP FOR STARTER</button>
                    </div>
                    <div className='card'>
                        <div>
                            <h2 style={{margin:'0px',padding:'0px',fontSize:'30px'}}>GROW</h2>
                            <p style={{margin:'0px',padding:'0px', marginTop:'10px',marginBottom:'20px'}}>Best for all businesses that want to take full control of their <br /> marketing automation and track their leads, click to close.</p>
                        </div>
                        <div>
                            <div className='pricecontainer'>
                                <h1 className='priceh1'>$399</h1><p >/monthly</p>
                            </div>
                            <div className='listcontainer'>
                                <h6 >What's included</h6>
                                <div className='list'>
                                    <img src={check} alt="" />Pipeline Management
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />Marketing Automation Campaigns
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />Live Call Transfer
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />GMB Messaging
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />Embed-able Form Builder
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />Reputation Management
                                </div>
                                <div className='list'>
                                    <img src={check} alt="" />24/7 Award Winning Support
                                </div>
                            </div>
                        </div>
                        <button className='buttonsignupforstarter' style={{marginTop:'10px'}}>SIGN UP FOR STARTER</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThirdPart
