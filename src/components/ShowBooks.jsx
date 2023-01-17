import { useEffect, useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { auth } from '../firebase/firebaseConfig';
import { CardsHome } from './CardsHome';
import uuid4 from 'uuid4';

export const ShowBooks = ({ children, info }) => {
   const [showList, setShowList] = useState([]);
   const { books, getBooks } = useBooks();

   useEffect(() => {
      getBooks();
   }, []);

   useEffect(() => {
      //TODO -> Llevar todo esto a utils, a un archivo .js (enviando la info y books)
      if (info === 'mostReleased') {
         const available = books.filter((book) => book.available === true && book.uid !== auth.currentUser.uid);
         const mostRecentBooks = available.sort((a, b) => {
            if (a.date < b.date) return 1;
            else if (a.date > b.date) return -1;
            return 0;
         });
         const booksCover = mostRecentBooks.splice(0, 3);
         setShowList(booksCover);
      } else if (info === 'author') {
         const listAuthors = ['Stephen King', 'Patrick Rothfuss', 'Terry Pratchett', 'Paul Auster', 'Eduardo Mendoza'];
         const randomIndex = Math.floor(Math.random() * listAuthors.length);
         const author = books.filter((book) => book.available === true && book.author === listAuthors[randomIndex]);
         const booksCover = author.splice(0, 3);

         setShowList(booksCover);
      } else if (info === 'district') {
         const districts = ['Ciutat Vella', 'Eixample'];
         const randomIndex = Math.floor(Math.random() * districts.length);
         const district = books.filter((book) => book.available === true && book.district === districts[randomIndex]);
         const booksCover = district.splice(0, 3);
         setShowList(booksCover);
      }
   }, [books]);

   return (
      <div className="mx-auto md:mx-2 lg:mx-auto mt-10 md:mt-5 flex flex-col md:flex-row" key={uuid4()}>
         <div className="sm:mx-auto md:mx-none md:mt-5 w-full md:w-10 md:flex md:justify-center" key={children}>
            <p className="md:-rotate-90 text-sm lg:text-base text-center mb-2 md:pt-14 font-semibold text-main dark:text-tahiti">
               {children}
            </p>
         </div>
         {showList.map((book, index) => {
            return (
               <div key={uuid4()}>
                  <CardsHome
                     author={book.author}
                     district={book.district}
                     image={book.image}
                     index={index}
                     title={book.title}
                     uidBook={book.uid}
                     currentUser={auth.currentUser.uid}
                  />
               </div>
            );
         })}
      </div>
   );
};
