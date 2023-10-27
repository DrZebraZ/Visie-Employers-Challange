import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons'

const IconButtonFunction = ({ icon:Icon, redirect, onClick}:{icon: IconType, redirect:string, onClick:any}) => {
  const handleClick = (event:any) => {
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