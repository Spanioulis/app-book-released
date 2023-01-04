import React from 'react';

const DistrictsFilter = ({ children, handleClick, value }) => {
   return (
      <li>
         <button onClick={handleClick} className="active:text-main focus:text-main" value={value}>
            {children}
         </button>
      </li>
   );
};

export default DistrictsFilter;
