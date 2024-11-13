import React from 'react';
import PropTypes from 'prop-types';
import { useRouteError } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
function Errorpage(){
  const error = useRouteError();
  console.log(error)
  return(
    <>
    <Sidebar/>
      <main>
        <h1>Whoops! Something went wrong, try again later</h1>
      </main>
    </>
    
  )
};


export default Errorpage;