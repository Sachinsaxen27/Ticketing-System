import React from 'react'
import './SecondPart.css'
import image1 from '../../Image/adobe.png'
import image2 from '../../Image/elastic.png'
import image3 from '../../Image/opendoor.png'
import image4 from '../../Image/airtable.png'
import image5 from '../../Image/elastic1.png'
import image6 from '../../Image/framer.png'
function SecondPart() {
  return (
    <div className='SecondPartcontainer'>
     <img src={image1} alt="Adobe" />
     <img src={image2} alt="Elastic" />
     <img src={image3} alt="Opendoor" />
     <img src={image4} alt="Airtable" />
     <img src={image5} alt="Elastic" />
     <img src={image6} alt="Framer" />
    </div>
  )
}

export default SecondPart
