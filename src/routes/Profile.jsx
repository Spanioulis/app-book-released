import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { collection, deleteDoc, doc } from 'firebase/firestore/lite';
import { useBooks } from '../hooks/useBooks';

import IconSVG from '../components/IconsSVG';

import CardsProfile from '../components/CardsProfile';

import img from '../assets/undraw_Books.png';

import '../App.css';
import '../styles/cardsProfile.css';
// import '../styles/loading.css';

// TODO -> Idea para la biblioteca o para la búsqueda:
// https://codepen.io/Snowing/pen/JZRxOK

const Profile = () => {
   const { error, getBooks, loading, userBooks } = useBooks();

   const scrollElement = useRef(0);
   // const [showList, setShowList] = useState([]);

   const scroll = (scrollOffset) => {
      scrollElement.current.scrollLeft += scrollOffset;
      // scrollElement.current.scrollLeft = -20;
   };

   useEffect(() => {
      getBooks();
   }, []);

   if (loading) return <div className="spinner"></div>;
   if (error) return <p>{error}</p>;

   const handleDelete = async (id) => {
      const bookRef = doc(db, 'books', id);
      await deleteDoc(bookRef);
      //TODO -> Substituir por 'onSnapshot'
      await getBooks();
   };

   return (
      <div className="text-center pb-10">
         {userBooks.length === 0 ? (
            <>
               <img src={img} alt="Not found books" className="illustration mx-auto" />
               <p>
                  ¡No has subido ningún libro, hazlo{' '}
                  <Link to="/uppload" className="text-green-500 dark:text-blue-700">
                     aquí
                  </Link>
                  !
               </p>
            </>
         ) : (
            <div className="flex">
               <button onClick={() => scroll(-740)}>
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-2 hover:text-main  dark:text-gray-300 dark:hover:text-tahiti"
                     d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
               </button>
               <div className="carousel rounded-box mx-auto lg:mx-10" ref={scrollElement}>
                  {userBooks.map((book) => (
                     <CardsProfile
                        author={book.author}
                        district={book.district}
                        image={book.image}
                        pages={book.pages}
                        title={book.title}
                        handleDelete={() => handleDelete(book.id)}
                     />
                  ))}
               </div>
               <button onClick={() => scroll(740)}>
                  <IconSVG
                     className="w-6 lg:w-7 h-6 lg:h-7 mx-1 lg:mx-2 hover:text-main  dark:text-gray-300 dark:hover:text-tahiti"
                     d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
               </button>
               {/* <div className="flex justify-center mt-3 gap-10"></div> */}
            </div>
         )}
      </div>
   );
};

export default Profile;
