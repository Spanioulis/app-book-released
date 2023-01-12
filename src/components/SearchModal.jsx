import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { auth } from '../firebase/firebaseConfig';

const Modal = ({ title, author, district, date, pages, image, category, description, infoLink, uidBook }) => {
   const { user } = useContext(UserContext);
   // const [currentUser, setCurrentUser] = useState(false);

   return (
      <>
         <input type="checkbox" id="my-modal-3" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative max-w-none w-full lg:w-3/4 mx-5 lg:mx-none dark:text-gray-300 dark:bg-metal">
               <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 sm:right-5 top-4 sm:top-5 hover:bg-main hover:border-main"
               >
                  ✕
               </label>
               <div className="flex flex-col">
                  <div className="flex ml-none md:ml-10 md:mt-5 mb-7">
                     <div className="flex-none w-24 md:w-48">
                        <img src={image} alt={title} className="rounded-md" />
                     </div>
                     <div
                        className="flex
                    flex-col ml-3"
                     >
                        <p className="mb-1 md:mb-2 text-xl md:text-2xl">{title}</p>
                        <p className="mb-1 md:mb-2 text-base md:text-xl">{author}</p>
                        <p className="mb-1 md:mb-2 text-sm md:text-base">
                           <i>{pages}</i> pág.
                        </p>
                        <p className="mb-0.5 md:mb-1 text-xs md:text-sm">
                           <i>Distrito:</i> {district}
                        </p>
                        <p className="mb-0.5 md:mb-1 text-xs md:text-sm">
                           <i>Fecha:</i> {date}
                        </p>
                        <p className="text-xs md:text-sm">
                           <i>Categoría:</i> {category}
                        </p>
                     </div>
                     <div className="flex-1 ml-5 md:ml-10">
                        <div
                           className="flex
                    flex-col"
                        >
                           <div className="flex text-sm md:text-xl md:justify-center">
                              <a
                                 href={infoLink}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex link link-hover my-auto"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 my-auto mr-2"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                    />
                                 </svg>
                                 Info Link
                              </a>
                           </div>
                           <div className="flex text-sm md:text-xl  md:justify-center">
                              {user && uidBook !== user.uid && (
                                 <>
                                    <Link
                                       to="/chat"
                                       state={{ uidBook, title }}
                                       className="flex mt-3 md:mt-5 text-main dark:text-tahiti transition ease-in  hover:scale-110 duration-300"
                                    >
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-5 h-5 my-auto mr-2"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                          />
                                       </svg>
                                       Contaca
                                    </Link>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <p className="text-base text-justify px-5 md:px-10">{description}</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Modal;
