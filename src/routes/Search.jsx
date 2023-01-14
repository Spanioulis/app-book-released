import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { auth, db } from '../firebase/firebaseConfig';
import { UserContext } from '../context/UserProvider';
import { collection, getDocs } from 'firebase/firestore/lite';
import { CardsSearch, FilterBar, SearchInput, SearchModal, Table } from '../components';

import img from '../assets/undraw_Not_found.png';
import '../App.css';
import '../styles/loading.css';
import { comment } from 'postcss';

export const Search = () => {
   const { user } = useContext(UserContext);
   const { q } = useParams();
   const { books, getBooks } = useBooks();

   const [booksList, setBooksList] = useState([]);
   const [modalBook, setModalBook] = useState([]);
   const [showAllBooks, setShowAllBooks] = useState(true);
   const [ascendSort, setAscendSort] = useState(true);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (showAllBooks) {
         if (q !== undefined) {
            //* Este filtro es para mis TODOS los libros (check todos los libros activado)
            const searchList = books.filter(
               (book) =>
                  (book.title.toLowerCase().includes(q.toLowerCase()) ||
                     book.author.toLowerCase().includes(q.toLowerCase())) &&
                  book.uid !== auth.currentUser.uid
            );
            setBooksList(searchList);
         } else {
            const searchList = books.filter((book) => book.uid !== auth.currentUser.uid);
            setBooksList(searchList);
         }
      } else {
         if (q !== undefined) {
            //* Este filtro es para mis TODOS los libros (check todos los libros activado)
            const searchList = books.filter(
               (book) =>
                  (book.title.toLowerCase().includes(q.toLowerCase()) ||
                     book.author.toLowerCase().includes(q.toLowerCase())) &&
                  book.uid === auth.currentUser.uid
            );
            setBooksList(searchList);
         } else {
            const searchList = books.filter((book) => book.uid === auth.currentUser.uid);
            setBooksList(searchList);
         }
      }
   }, [q, books, showAllBooks]);

   useEffect(() => {
      getBooks();

      if (user === null) {
         async function getData() {
            const booksRefCollection = collection(db, 'books');
            const querySnapshot = await getDocs(booksRefCollection);
            const dataDB = querySnapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data()
            }));
            setBooksList(dataDB);
         }
         getData();
      }
   }, []);

   const handleAllBooks = (e) => {
      e.target.value === 'my-books' ? setShowAllBooks(false) : setShowAllBooks(true);
   };

   const handleSort = (e) => {
      const item = e.target.value;
      setAscendSort(!ascendSort);

      if (ascendSort) {
         const searchList = [...booksList].sort((a, b) => (a[item] < b[item] ? 1 : -1));
         setBooksList(searchList);
      } else {
         const searchList = [...booksList].sort((a, b) => (a[item] > b[item] ? 1 : -1));
         setBooksList(searchList);
      }
   };

   const handleDistrict = (e) => {
      const item = e.target.value;
      const searchList = [...books].filter((book) => book.district.includes(item));
      setBooksList(searchList);
   };

   const handleModal = (author, category, date, description, district, image, infoLink, pages, title, uid) => {
      setModalBook({
         ...modalBook,
         author,
         category,
         date,
         description,
         district,
         image,
         infoLink,
         pages,
         title,
         uid
      });
   };

   let component = null;

   if (!booksList.length && loading) {
      component = <div className="spinner"></div>;
      setTimeout(() => {
         console.log('Entra, y setLoading (false)');
         setLoading(false);
      }, 3500);
   } else {
      component = component = <img src={img} alt="Not found books" className="illustration mx-auto" />;
   }

   return (
      <div>
         <div className="flex flex-col justify-center dark:text-gray-200 ">
            <div className="flex my-10">
               <div className="flex-1 mr-5">
                  {user && <FilterBar handleDistrict={handleDistrict} handleAllBooks={handleAllBooks} />}
               </div>
               <div className="flex-3 mr-5 sm:mr-0">
                  <SearchInput
                     text="search"
                     placeholder="Busca un libro..."
                     classInput="input input-bordered text-sm md:text-base w-48 md:w-96 h-12 text-gray-700 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-400 dark:bg-gray-100 focus:border-main dark:focus:border-tahiti focus:ring-main dark:focus:ring-tahiti dark:focus:ring-zinc-500 w-2/3 mb-3"
                     classButton="btn btn-square dark:bg-zinc-800 hover:bg-zinc-900 h-12"
                  />
                  <div className="flex gap-10 text-base justify-start">
                     <span className="text-main dark:text-tahiti italic">{q}</span>
                     <p className="text-sm md:text-base">
                        Encontrado/s <span className=" font-bold">{booksList.length}</span> libro/s
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex-1">
               {booksList.length === 0 ? (
                  component
               ) : (
                  <div className="overflow-x-auto mx-4 sm:mx-0">
                     <table className="table w-full text-sm lg:text-base">
                        <Table handleSort={handleSort} />
                        {booksList.map((book, index) => (
                           <CardsSearch
                              author={book.author}
                              category={book.category}
                              date={book.date}
                              description={book.description}
                              district={book.district}
                              email={book.email}
                              handleModal={handleModal}
                              image={book.image}
                              index={index}
                              infoLink={book.infoLink}
                              key={book.id}
                              pages={book.pages}
                              showAllBooks={showAllBooks}
                              title={book.title}
                              uid={book.uid}
                           />
                        ))}
                        <tfoot>
                           <tr>
                              <th className="dark:bg-gray-700"></th>
                              <th className="dark:bg-gray-700">Título</th>
                              <th className="dark:bg-gray-700">Autor</th>
                              <th className="dark:bg-gray-700">Páginas</th>
                              <th className="dark:bg-gray-700">Fecha</th>
                              <th className="dark:bg-gray-700">Distrito</th>
                              <th className="dark:bg-gray-700">Usuario</th>
                              <th className="dark:bg-gray-700">Información</th>
                           </tr>
                        </tfoot>
                     </table>
                  </div>
               )}
            </div>
         </div>
         <SearchModal
            title={modalBook.title}
            image={modalBook.image}
            author={modalBook.author}
            district={modalBook.district}
            pages={modalBook.pages}
            date={modalBook.date}
            category={modalBook.category}
            description={modalBook.description}
            infoLink={modalBook.infoLink}
            uidBook={modalBook.uid}
         />
      </div>
   );
};
