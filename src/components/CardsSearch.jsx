import { useEffect, useState } from 'react';
import info from '../assets/info.svg';

const CardsSearch = ({
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
   // const impar = index % 2 !== 0;

   useEffect(() => {
      if (email) {
         let index = email.indexOf('@');
         const username = email.substring(0, index);
         // const usernameUppercase = username.charAt(0).toUpperCase() + username.slice(1);
         setUsername(username);
      } else {
         setUsername('');
      }
   }, [email]);

   return (
      <>
         <tbody>
            <tr>
               {/* <tr className={impar ? 'active' : undefined}> */}
               <th className="dark:bg-gray-500">{index + 1}</th>
               <td className="dark:bg-gray-500">{title}</td>
               <td className="dark:bg-gray-500">{author}</td>
               <td className="dark:bg-gray-500">{pages}</td>
               <td className="dark:bg-gray-500">{date}</td>
               <td className="dark:bg-gray-500">{showAllBooks && district}</td>
               <td className="dark:bg-gray-500">{username}</td>
               <td className=" dark:bg-gray-500">
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

                  {/* <SearchModal info={modalBook} /> */}
               </td>
            </tr>
         </tbody>
         {/* <p>{modalBook?.title}</p> */}
      </>
   );
};

export default CardsSearch;
