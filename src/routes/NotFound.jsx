import React from 'react';
import img from '../assets/404-error-page-not-found.png';

const NotFound = () => {
    return (
        <div>
            <img src={img} className="mix-blend-multiply mx-auto w-6/12 mt-5" />
        </div>
    );
};

export default NotFound;
