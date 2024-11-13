import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Postfeed from '../components/Postfeed/Postfeed';
import Rightbar from '../components/Rightbar/Rightbar';
function  Home() {
    
  return(
    <div className='home'>
        <Sidebar/>
        <section className='homefeed'>
            <Postfeed/>
        </section>
        <section className='rightbar'>
        <Rightbar />
        </section>
    </div>
  )
}
  ;

export default Home;
