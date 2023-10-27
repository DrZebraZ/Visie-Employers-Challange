import React from 'react';
import { IconType } from 'react-icons'

const IconButton = ({ icon:Icon }:{icon:IconType}) => {

  return (
    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {Icon && <Icon size={30} color="red" />} {}
    </button>
  );
};

export default IconButton;