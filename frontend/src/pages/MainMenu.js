import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './SimpleForm.css';


const MainMenu = () => {
  return (
    <div>
      <h1>Main Menu</h1>
     
         <div> <Link to="/create">
            <button className='FpagecreateB'>Create</button>
          </Link></div>

          <div> <Link to="/compare">
            <button className='FpageupdateB'>Compare</button>
          </Link></div>

          <div> <Link to="/View">
            <button className='FpageviewB'>View</button>
          </Link></div>
    </div>
  );
};

export default MainMenu;
