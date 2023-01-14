import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchForm = ({ text, placeholder, className }) => {
   const [search, setSearch] = useState('');
   const navigate = useNavigate();

   const handleInputSearch = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
   };

   const handleSearch = (e) => {
      if (e.key === 'Enter' && e.target.value !== '') {
         navigate(`/search/${search}`);
         setSearch('');
      }
   };

   return (
      <>
         <input
            type={text}
            placeholder={placeholder}
            className={className}
            value={search}
            onChange={handleInputSearch}
            onKeyDown={handleSearch}
         />
      </>
   );
};
