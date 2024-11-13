import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Profile from '../components/Profile/Profile'
function  Home() {
    
  return(
    <div className='home'>
        <Sidebar/>
        <section className='homefeed'>
            <Profile/>
        </section>
  </div>
  )
}
  ;

export default Home;
