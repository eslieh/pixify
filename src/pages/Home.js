import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Postfeed from '../components/Postfeed/Postfeed'
function  Home() {
    
  return(
    <div className='home'>
        <Sidebar/>
        <section className='homefeed'>
            <Postfeed/>
        </section>
  </div>
  )
}
  ;

export default Home;
