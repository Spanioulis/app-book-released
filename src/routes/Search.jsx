import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
// import { doc, updateDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase/firebaseConfig';

import SearchInput from '../components/SearchInput';
import CardsSearch from '../components/CardsSearch';
import SearchModal from '../components/SearchModal';
import Table from '../components/Table';
import Filters from '../components/Filters';

// import uuid4 from 'uuid4';
// import SearchInput from '../components/SearchInput';
import img from '../assets/undraw_Not_found.png';
import '../App.css';
import '../styles/loading.css';

const Search = () => {
   const { q } = useParams();
   const { books, getBooks } = useBooks();

   const [booksList, setBookList] = useState([]);
   console.log('booksList', booksList);
   const [modalBook, setModalBook] = useState([]);
   const [showAllBooks, setShowAllBooks] = useState(true);
   const [ascendSort, setAscendSort] = useState(true);
   //    const [filter, setFilter] = useState(true);

   // TODO -> Realizar un 'loading'
   //* Este filtro es para mis libros que no sean míos

   useEffect(() => {
      getBooks();
   }, []);

   useEffect(() => {
      if (showAllBooks) {
         if (q !== undefined) {
            // Este filtro es para mis TODOS los libros (check todos los libros activado)
            const searchList = books.filter(
               (book) =>
                  (book.title.toLowerCase().includes(q.toLowerCase()) ||
                     book.author.toLowerCase().includes(q.toLowerCase())) &&
                  book.uid !== auth.currentUser.uid
            );
            setBookList(searchList);
         } else {
            const searchList = books.filter((book) => book.uid !== auth.currentUser.uid);
            setBookList(searchList);
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
            setBookList(searchList);
         } else {
            const searchList = books.filter((book) => book.uid === auth.currentUser.uid);
            setBookList(searchList);
         }
      }
   }, [q, books, showAllBooks]);

   // Reservar Libro -> Activar de nuevo en el Modal, solo cuando no esté en Mis libros
   // const handleUpdate = async (id) => {
   //     const bookRef = doc(db, 'books', id);
   //     await updateDoc(bookRef, {
   //         enable: false
   //     });
   //     await getBooks();
   // };

   const handleAllBooks = (e) => {
      e.target.value === 'my-books' ? setShowAllBooks(false) : setShowAllBooks(true);
   };

   const handleSort = (e) => {
      const item = e.target.value;
      console.log('item', item);
      setAscendSort(!ascendSort);

      if (ascendSort) {
         const searchList = [...booksList].sort((a, b) => (a[item] < b[item] ? 1 : -1));
         setBookList(searchList);
      } else {
         const searchList = [...booksList].sort((a, b) => (a[item] > b[item] ? 1 : -1));
         setBookList(searchList);
      }
   };

   const handleDistrict = (e) => {
      const item = e.target.value;
      const searchList = books.filter((book) => book.district.includes(item));
      setBookList(searchList);
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

   return (
      <div>
         <div className="flex flex-col justify-center dark:text-gray-200 ">
            {/* <div className="flex-1 justify-between my-10"> */}
            <div className="flex my-10">
               {/* TODO -> Pasarlo a un componente cuando pongamos los filtros (SearchBar, por ejemplo) */}
               <div className="flex-1 dropdown dropdown-down text-sm">
                  <label tabIndex={0} className="btn m-1">
                     Mostrar ...
                  </label>
                  <ul
                     tabIndex={0}
                     className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 dark:text-metal"
                  >
                     <li>
                        <button value="my-books" onClick={handleAllBooks} className="active:text-main focus:text-main">
                           Mis libros
                        </button>
                     </li>
                     <li>
                        <button value="all-books" onClick={handleAllBooks} className="active:text-main focus:text-main">
                           Todos
                        </button>
                     </li>
                  </ul>
               </div>
               <div className="flex-1 dropdown dropdown-down text-sm">
                  <label tabIndex={0} className="btn m-1">
                     Distritos
                  </label>
                  <ul
                     tabIndex={0}
                     className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 dark:text-metal"
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
               <div className="flex-3">
                  <SearchInput
                     text="search"
                     placeholder="Busca un libro..."
                     classInput="input input-bordered text-base w-96 h-14 text-gray-700 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-400 dark:bg-gray-100 focus:border-main dark:focus:border-tahiti focus:ring-main dark:focus:ring-tahiti dark:focus:ring-zinc-500 w-2/3 mb-3"
                     classButton="btn btn-square dark:bg-zinc-800 hover:bg-zinc-900 h-14"
                  />
                  <div className="flex gap-10 text-base justify-center">
                     {/* TODO - poner etiqueta redonda */}
                     <span className="text-main dark:text-tahiti italic">{q}</span>
                     <p>
                        Encontrado/s <span className="font-bold">{booksList.length}</span> libro/s
                     </p>
                  </div>
               </div>
               {/* Búsqueda actual:{' '} */}
            </div>
            {/* Pasar todo esto a un componente filter o similar */}

            {/*  */}
            <div className="flex-1 ">
               {booksList.length === 0 ? (
                  <>
                     {/* TODO -> Poner todas las búsuqedas cuando cambiemos la ficha a un listado... */}
                     {/* <div className="spinner"></div> */}
                     <img src={img} alt="Not found books" className="illustration mx-auto" />
                     {/* <p className="text-center">¡Lo sentimos, no hay coincidencias!</p> */}
                  </>
               ) : (
                  <>
                     <div className="overflow-x-auto ">
                        <table className="table w-full text-base">
                           <Table handleSort={handleSort} />
                           {booksList.map((book, index) => (
                              <>
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
                                    pages={book.pages}
                                    showAllBooks={showAllBooks}
                                    title={book.title}
                                    uid={book.uid}
                                 />
                              </>
                           ))}
                           <tfoot>
                              <tr>
                                 <th className="dark:bg-gray-600"></th>
                                 <th className="dark:bg-gray-600">Título</th>
                                 <th className="dark:bg-gray-600">Autor</th>
                                 <th className="dark:bg-gray-600">Páginas</th>
                                 <th className="dark:bg-gray-600">Fecha</th>
                                 <th className="dark:bg-gray-600">Distrito</th>
                                 <th className="dark:bg-gray-600">Usuario</th>
                                 <th className="dark:bg-gray-600">Información</th>
                              </tr>
                           </tfoot>
                        </table>
                     </div>
                  </>
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

export default Search;
