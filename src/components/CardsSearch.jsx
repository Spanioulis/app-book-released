import { useEffect } from 'react';
import { useState } from 'react';
import info from '../assets/info.svg';
import SearchModal from './SearchModal';

const CardsSearch = ({
   author,
   category,
   date,
   description,
   district,
   handleModal,
   image,
   index,
   infoLink,
   pages,
   title,
   showAllBooks
}) => {
   const impar = index % 2 !== 0;
   return (
      <>
         <tbody>
            <tr className={impar ? 'active' : undefined}>
               <th>{index + 1}</th>
               <td>{title}</td>
               <td>{author}</td>
               <td>{pages}</td>
               <td>{date}</td>
               <td>{showAllBooks && district}</td>
               <td className="mx-auto my-auto text-tahi">
                  <span
                     onClick={() =>
                        handleModal(author, category, date, description, district, image, infoLink, pages, title)
                     }
                  >
                     <label htmlFor="my-modal-3">
                        <img
                           src={info}
                           alt="info-icon"
                           width="20"
                           htmlFor="my-modal-3"
                           className="cursor-pointer hover:scale-110"
                        />
                     </label>
                  </span>

                  {/* <SearchModal info={modalBook} /> */}
               </td>
            </tr>
         </tbody>
         {/* <p>{modalBook?.title}</p> */}
      </>
   );
};

export default CardsSearch;
