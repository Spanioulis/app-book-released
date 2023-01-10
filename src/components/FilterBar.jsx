import React from 'react';
import Filters from '../components/Filters';

const FilterBar = ({ handleDistrict, handleAllBooks }) => {
   return (
      <div className="text-sm lg:text-base font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
         <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
               <button
                  value="all-books"
                  onClick={handleAllBooks}
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"
               >
                  Todos
               </button>
            </li>
            <li className="mr-2">
               <button
                  value="my-books"
                  onClick={handleAllBooks}
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"
               >
                  Mis libros
               </button>
            </li>
            <div className="dropdown dropdown-right">
               <label
                  tabIndex={0}
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"
               >
                  Distritos
               </label>
               <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-[0_35px_60px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_35px_60px_-5px_rgba(0,0,0,0.7)] bg-base-100 rounded-box w-52 dark:text-gray-400 dark:bg-dark"
               >
                  <Filters handleClick={handleDistrict} value="Ciutat Vella">
                     Ciutat Vella
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Sant Martí">
                     Sant Martí
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Eixample">
                     Eixample
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Sants-Montjuïc">
                     Sants-Montjuïc
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Les Corts">
                     Les Corts
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Sarrià-Sant Gervasi">
                     {' '}
                     Sarrià-Sant Gervasi
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Gràcia">
                     Gràcia
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Horta-Guinardó">
                     Horta-Guinardó
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Nou Barris">
                     Nou Barris
                  </Filters>
                  <Filters handleClick={handleDistrict} value="Sant Andreu">
                     Sant Andreu
                  </Filters>
               </ul>
            </div>
         </ul>
      </div>
   );
};

export default FilterBar;
