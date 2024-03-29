import React from 'react';
import { Link } from 'react-router-dom';
import { IconSVG } from './IconsSVG';

export const CardsLanding = ({ index, image, title, author, district }) => {
   return (
      <div className="carousel-item " key={index}>
         <div className="group card card-home card-side w-60 lg:w-64 h-52 bg-silver dark:bg-dark dark:text-gray-300 hover:scale-110 mr-1">
            <figure className="ml-4">
               <img src={image} alt={title} className="rounded-md w-full" />
            </figure>
            <div className="card-body w-2/3 px-5 flex justify-between">
               <div>
                  <p className="card-title text-sm overflow-hidden">{title}</p>
                  <p className="text-xs ">{author}</p>
                  <p className="text-xs italic">{district}</p>
               </div>
               <div className="flex ml-3">
                  <Link
                     to="/chat"
                     className="hidden group-hover:block text-xs rounded-3xl text-main hover:text-metal dark:text-tahiti hover:dark:text-gray-300 hover:scale-105"
                  >
                     <IconSVG
                        className="w-5 h-5 my-auto mr-2"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                     />
                     Contacta
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};
