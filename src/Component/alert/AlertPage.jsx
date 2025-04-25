import React from 'react'
import './AlertPage.css'
import image1 from '../../Image/Close.png'
function AlertPage(props) {
  return (
    <>
      <div className='alertbox' style={{backgroundColor:`${props.color}`}}>
        <div className='alertmessage'>
          {props.text}
          <div className='cross' onClick={()=>props.clearerror(false)}>
            X
          </div>
          {/* <img src={image1} alt="" /> */}
        </div>
      </div>
    </>
  )
}

export default AlertPage
