import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchInput = ({ text, placeholder, classInput, classButton }) => {
   const [search, setSearch] = useState('');
   const navigate = useNavigate();

   const handleInputSearch = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
   };

   const handleSearch = (e) => {
      if (e.key === 'Enter') {
         navigate(`/search/${search}`);
      }
   };

   const handleClick = () => {
      navigate(`/search/${search}`);
   };

   return (
      <>
         <div className="form-control">
            <div className="input-group">
               <input
                  type={text}
                  placeholder={placeholder}
                  className={classInput}
                  value={search}
                  onChange={handleInputSearch}
                  onKeyDown={handleSearch}
               />
               <button className={classButton} onClick={handleClick}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
               </button>
            </div>
         </div>
      </>
   );
};
