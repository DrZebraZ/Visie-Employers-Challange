import { NavLink } from "react-router-dom";
import React from "react";
import { IconType } from 'react-icons'

const IconButtonRedirect = ({ icon:Icon, redirect }:{icon:IconType, redirect:string}) => {
  return (
    <NavLink to={redirect} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        {Icon && <Icon size={30} color="red" />} {}
      </button>
    </NavLink>
  );
};
export default IconButtonRedirect