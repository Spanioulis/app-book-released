export const Filters = ({ children, handleClick, value }) => {
   return (
      <li>
         <button onClick={handleClick} className="active:text-main focus:text-main" value={value}>
            {children}
         </button>
      </li>
   );
};
