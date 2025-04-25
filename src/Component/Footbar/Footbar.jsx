import React from 'react';
import logo from '../../Image/cloud.png';
import './Footbar.css';
import icon1 from '../../Image/mail.png'
import icon2 from '../../Image/linkedin.png'
import icon3 from '../../Image/twitter.png'
import icon4 from '../../Image/youtube.png'
import icon5 from '../../Image/discord.png'
import icon6 from '../../Image/Vector (1).png'
import icon7 from '../../Image/insta.png'
function Footbar() {
    return (
        <>
            <div className='footbardiv'>
                <div>
                    <img src={logo} alt="cloud" />
                    <h1>Hubly</h1>
                </div>
                <div className='detailsblock'>
                    <div className='divdetials'>
                        <h5>Product</h5>
                        <div>Universal checkout</div>
                        <div>Payment workflows</div>
                        <div>Observability</div>
                        <div>UpliftAI</div>
                        <div>Apps & integrations</div>
                    </div>
                    <div className='divdetials'>
                        <h5>Why Primer</h5>
                        <div>Expand to new markets</div>
                        <div>Boost payment success</div>
                        <div>Improve conversion rates</div>
                        <div>Reduce payments fraud</div>
                        <div>Recover revenue</div>
                    </div>
                    <div className='divdetials'>
                        <h5>Developers</h5>
                        <div>Primer Docs</div>
                        <div>API Reference</div>
                        <div>Payment method guide</div>
                        <div>Service Status</div>
                        <div>Community</div>
                    </div>
                </div>
            </div>
            <br />
            <div className='seconddetailslist'>
                <div className='divdetials divdetials2'>
                    <h5>Resources</h5>
                    <div>Blog</div>
                    <div>Success stories</div>
                    <div>News room</div>
                    <div>Terms</div>
                    <div>Privacy</div>
                </div>
                <div className='divdetials divdetials2' style={{ width: '7rem' }}>
                    <h5>Company</h5>
                    <div>Careers</div>
                </div>
                <div className='imageoption'>
                    <img src={icon1} alt="mail" />
                    <img src={icon2} alt="Linkedin" style={{ width: '22px' }} />
                    <img src={icon3} alt="Twitter" />
                    <img src={icon4} alt="Youtube" />
                    <img src={icon5} alt="Discord" />
                    <img src={icon6} alt="Vector" />
                    <img src={icon7} alt="Insta" />
                </div>
            </div>
        </>


    )
}

export default Footbar
