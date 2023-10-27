import React from 'react';
import { NavLink } from 'react-router-dom';

const IconButtonFunction = ({ icon:Icon, redirect, onClick}) => {
  const handleClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating up the DOM hierarchy
    onClick(); // Call the provided onClick handler
  };
  return (
    
      <NavLink onClick={handleClick} to={redirect} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        {Icon && <Icon size={30} color="red" />} {}
      </NavLink>
    
  );
};
export default IconButtonFunction