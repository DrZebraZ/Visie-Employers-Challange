import React from 'react';

const IconButton = ({ icon:Icon }) => {

  return (
    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {Icon && <Icon size={30} color="red" />} {}
    </button>
  );
};

export default IconButton;