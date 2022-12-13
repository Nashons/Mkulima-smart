import React from 'react';
import "./landing.css";

const Landing = () => {
  return (
      <section id='landing'>
          <div className='landing_page'>
              <div className='ellipse1'/>
              <div className='ellipse2'/>
              <div className='ellipse3'/>
              <div className='ellipse4'/>
              <div className='ellipse5' />
              <div className='Discover'> Lima Smart<br/>peer tu Peer</div>
              <div className='buysmall'>Buy and Sell Farm Products on <br /> Mkulima Smart <br /> market place</div>
              <a href='Home'><button className='exploreBtn'>Explore</button></a>
              <div className='howDiv'>                  
                  <div className='howBigFont'>To Explore, Buy, Creating... How this works!</div>
                  <div className='howsmallFont'>We are Kenyans in the farming industry who are helping other farmers secure their payments while trading with other farmers.<br/>We work with small-scale farmers and large-scale farmers looking to sell their goods locally and internationally. <br/>Using smart contracts, we create anonymous identities for both farmers and retailers.<br/><br/>We also provide insurance for goods and funds exchanged thereafter protecting both the customer and the seller</div>
              </div>


          </div>
      </section>
  )
}

export default Landing