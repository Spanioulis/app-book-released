import { useEffect, useState } from 'react';

import info from '../assets/info.svg';

export const CardsSearch = ({
   author,
   category,
   date,
   description,
   district,
   email,
   handleModal,
   image,
   index,
   infoLink,
   pages,
   title,
   showAllBooks,
   uid
}) => {
   const [username, setUsername] = useState('');

   useEffect(() => {
      if (email) {
         let index = email.indexOf('@');
         const username = email.substring(0, index);
         setUsername(username);
      } else {
         setUsername('');
      }
   }, [email]);

   return (
      <tbody>
         <tr>
            <th className="dark:bg-gray-600 dark:font-light">{index + 1}</th>
            <td className="dark:bg-gray-600 max-w-xs dark:font-light overflow-hidden">{title}</td>
            <td className="dark:bg-gray-600 dark:font-light w-48">{author}</td>
            <td className="dark:bg-gray-600 dark:font-light max-w-fit">{pages}</td>
            <td className="dark:bg-gray-600 dark:font-light">{date}</td>
            <td className="dark:bg-gray-600 dark:font-light">{showAllBooks && district}</td>
            <td className="dark:bg-gray-600 dark:font-light">{username}</td>
            <td className=" dark:bg-gray-600 dark:font-light">
               <span
                  onClick={() =>
                     handleModal(author, category, date, description, district, image, infoLink, pages, title, uid)
                  }
               >
                  <label htmlFor="my-modal-3" className="flex justify-center">
                     <img
                        src={info}
                        alt="info-icon"
                        width="20"
                        htmlFor="my-modal-3"
                        className="cursor-pointer hover:scale-110"
                     />
                  </label>
               </span>
            </td>
         </tr>
      </tbody>
   );
};
