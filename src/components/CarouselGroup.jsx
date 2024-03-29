import { useRef } from 'react';
import { CardsLanding } from './CardsLanding';
import { IconSVG } from './IconsSVG';

import uuid4 from 'uuid4';

export const CarouselGroup = ({ books }) => {
   const scrollElement = useRef(0);

   const scroll = (scrollOffset) => {
      scrollElement.current.scrollLeft += scrollOffset;
   };

   return (
      <div>
         <div className="carousel rounded-box mx-auto lg:mx-28" ref={scrollElement}>
            {books.map((book, index) => (
               <div key={uuid4()}>
                  <CardsLanding
                     author={book.author}
                     district={book.district}
                     image={book.image}
                     index={index}
                     title={book.title}
                  />
               </div>
            ))}
         </div>
         <div className="flex justify-center mt-3 gap-10">
            <button onClick={() => scroll(-1000)}>
               <IconSVG
                  className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-2 hover:text-main  dark:text-gray-300 dark:hover:text-tahiti"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </button>

            <button onClick={() => scroll(1000)}>
               <IconSVG
                  className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-2 hover:text-main  dark:text-gray-300 dark:hover:text-tahiti"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </button>
         </div>
      </div>
   );
};
