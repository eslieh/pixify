import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Postfeed from '../components/Postfeed/Postfeed';
import Rightbar from '../components/Rightbar/Rightbar';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

function Home() {
  useEffect(() => {
    // Check if the "username" cookie is set
    const username = Cookies.get('username'); // You can replace 'username' with the actual cookie name you are using
    console.log(username);
    if (!username) {
      // If no cookie is set, redirect to the /auth page
      window.location.href = "/auth";
    }
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div className='home'>
      <Sidebar />
      <section className='homefeed'>
        <Postfeed />
      </section>
      <section className='rightbar'>
        <Rightbar />
      </section>
    </div>
  );
}
export default Home;