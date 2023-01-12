import React from 'react';
import { Link } from 'react-router-dom';

const HeroUpload = () => {
   return (
      <div className="hero min-h-96 pt-16 pb-0 md:pb-8  text-metal dark:text-gray-300">
         <div className="hero-content text-center">
            <div className="max-w-md">
               <h1 className="max-w-xl mb-4 text-2xl md:text-4xl font-bold tracking-tight leading-none  text-metal dark:text-gray-300">
                  ¡Libera tu libro ahora!
               </h1>
               <p className="max-w-xl mb-6 text-base font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
                  ¿Tienes libros en casa que leíste hace tiempo (o nunca) y están cogiendo polvo en la estantería?
                  Súbelos a tu biblioteca para que otros lectores puedan verlos, y de esa manera poder hacer un trueque.
               </p>
               <Link to="/upload" className="text-2xl text-main dark:text-tahiti link-hover">
                  Free Edmundo!
               </Link>
            </div>
         </div>
      </div>
   );
};

export default HeroUpload;
