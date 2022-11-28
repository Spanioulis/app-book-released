import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchInput = ({ text, placeholder, className }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    // const [params, setParams] = useSearchParams();

    const handleInputSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            // navigate('/search', { state: search, replace: true });
            navigate(`/search/${search}`);
            // setParams({ q: search });
            setSearch('');
        }
    };

    return (
        <div className="form-control h-10 w-28 sm:w-48">
            {/* Añadir onChange para realizar la búsqueda... */}
            <input
                type={text}
                placeholder={placeholder}
                className={className}
                value={search}
                onChange={handleInputSearch}
                onKeyDown={handleSearch}
            />
        </div>
    );
};

export default SearchInput;
