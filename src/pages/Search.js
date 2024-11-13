import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Search from '../components/Search/Search'
function  Home() {
    
  return(
    <div className='home'>
        <Sidebar/>
        <section className='homefeed'>
            <Search/>
        </section>
  </div>
  )
}
  ;

export default Home;
