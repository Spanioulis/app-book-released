import { useEffect, useState } from 'react';
import axios from 'axios';
import FormButton from '../components/FormButton';
import uuid4 from 'uuid4';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore/lite';
import { useUsers } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS;

const options = {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit',
   hour: '2-digit',
   minute: '2-digit',
   second: '2-digit'
};
const date = new Date();
// console.log(date.toLocaleDateString('en-US', options));

const UploadBook = () => {
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   const [searchAuthor, setSearchAuthor] = useState('');
   const [searchTitle, setSearchTitle] = useState('');
   const [booksAPI, setBooksAPI] = useState([]);
   const [bookSelected, setBookSelected] = useState(null);
   // TODO-> añadir el uid y el district del usuario (sacarlo del auth...)
   const { currentUser, getUsers } = useUsers();
   const API_TITLE = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTitle}&${API_KEY}`;
   const API_AUTHOR = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchAuthor}&${API_KEY}`;
   const [book, setBook] = useState({
      title: '',
      author: '',
      pages: '',
      category: '',
      available: true,
      publisher: ''
   });
   const navigate = useNavigate();

   //* Buscar coincidencias de la búsqueda con la lista de libros
   const handleSearch = (e) => {
      console.log(e.target.name);
      if (e.target.name === 'title') {
         setSearchTitle(e.target.value);
      }

      setSearchAuthor(e.target.value);
   };

   //* Seleccionamos libro para pintarlo posteriormente en la 'card', el cual pasa por el filtro de abajo
   const handleSelect = (e) => {
      e.preventDefault();
      if (e.target.value !== ' ') {
         setBookSelected(e.target.value);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // TODO -> Añadir a Firestore...
      const usersCollectionRef = collection(db, 'books');
      try {
         setLoading(true);
         await addDoc(usersCollectionRef, {
            ...book,
            district: currentUser[0].district,
            uid: currentUser[0].uid,
            date: date.toLocaleDateString('en-US', options)
         });
         navigate('/profile');
      } catch (error) {
         console.log(error.message);
      } finally {
         setLoading(false);
      }
   };
   const handleInput = (e) => {
      const { name, value } = e.target;
      setBook({ ...book, [name]: value });
   };

   //* Llamada a la API...
   useEffect(() => {
      const firstCallAuthor = searchAuthor.length === 5;
      const firstCallTitle = searchTitle.length === 5;
      const secondCallAuthor = searchAuthor.length === 8;
      const secondCallTitle = searchTitle.length === 8;
      const thirdCallAuthor = searchAuthor.length === 12;
      const thirdCallTitle = searchTitle.length === 12;
      const fourthCallAuthor = searchAuthor.length === 15;
      const fourthCallTitle = searchTitle.length === 15;

      if (firstCallAuthor || secondCallAuthor || thirdCallAuthor || fourthCallAuthor) {
         axios
            .get(API_AUTHOR)
            .then(({ data }) => {
               if (data.items !== undefined) {
                  setBooksAPI(data.items);
               }
            })
            .catch(({ message }) => console.log(message));
      }
      if (firstCallTitle || secondCallTitle || thirdCallTitle || fourthCallTitle) {
         axios
            .get(API_TITLE)
            .then(({ data }) => {
               if (data.items !== undefined) {
                  setBooksAPI(data.items);
               }
            })
            .catch(({ message }) => console.log(message));
      }
   }, [searchAuthor, searchTitle]);

   // Pintamos la información cuando se selecciona un libro, y por lo tanto 'exist'
   useEffect(() => {
      const exists = booksAPI.filter((book) => book.volumeInfo.title === bookSelected);
      if (bookSelected) {
         if (exists[0].volumeInfo.imageLinks === undefined) {
            setMessage('* No tiene imagen, elige otro libro, por favor.');
            setTimeout(() => {
               setMessage('');
            }, 3000);
         } else {
            setBook({
               available: true,
               title: exists?.[0]?.volumeInfo?.title,
               author: exists?.[0]?.volumeInfo?.authors?.[0],
               pages: exists?.[0]?.volumeInfo?.pageCount ?? 'Info no disponible',
               category: exists?.[0]?.volumeInfo?.categories?.[0] ?? 'Info no disponible',
               image: exists?.[0]?.volumeInfo?.imageLinks?.thumbnail,
               description:
                  exists?.[0]?.volumeInfo?.description ??
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam dolor explicabo, consequatur laborum nam repellendus labore quidem recusandae perspiciatis reiciendis quos eaque exercitationem maxime cumque, aspernatur sit dolores molestiae necessitatibus!',
               publisher: exists?.[0]?.volumeInfo?.publisher ?? 'Info no disponible',
               infoLink: exists?.[0]?.volumeInfo?.infoLink ?? 'Info no disponible'
            });
         }
      }
   }, [bookSelected]);

   useEffect(() => {
      getUsers();
   }, []);

   // ****** BREAKPOINT!!!!

   return (
      <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-10 w-4/5 lg:w-1/2 mx-auto mt-3 ">
         <div className="card mx-auto flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-stone-800 dark:border-stone-700 dark:bg-metal ">
            <p className="text-center text-base mt-5 mx-7 text-red-500">{message}</p>
            <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-1 mb-1 ">
               <input
                  type="text"
                  placeholder="Busca por título..."
                  onChange={handleSearch}
                  className="input input-bordered w-full max-w-xs dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  name="title"
               />

               <input
                  type="text"
                  placeholder="Busca por autor..."
                  onChange={handleSearch}
                  className="input input-bordered w-full max-w-xs  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  name="author"
               />

               <select
                  onClick={handleSelect}
                  className="select w-full mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400 max-w-md"
               >
                  <option key=" " value=" " name="option">
                     Encuentra tu libro...
                  </option>

                  {booksAPI.map((book) => {
                     return (
                        <option key={uuid4()} value={book.volumeInfo.title} name="option">
                           {book.volumeInfo.title}
                        </option>
                     );
                  })}
               </select>
               <input
                  type="text"
                  placeholder="Título"
                  value={book.title}
                  name="title"
                  className="input input-bordered w-full max-w-xs mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  onChange={handleInput}
                  required
               />
               <input
                  type="text"
                  placeholder="Autor"
                  value={book.author}
                  name="author"
                  className="input input-bordered w-full max-w-xs mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  onChange={handleInput}
                  required
               />
               <input
                  type="text"
                  placeholder="Páginas"
                  value={book.pages}
                  name="pages"
                  className="input input-bordered w-full max-w-xs mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  onChange={handleInput}
                  required
               />
               <input
                  type="text"
                  placeholder="Editorial"
                  value={book.publisher}
                  name="publisher"
                  className="input input-bordered w-full max-w-xs mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  onChange={handleInput}
                  required
               />
               <input
                  type="text"
                  placeholder="Categoría"
                  value={book.category}
                  name="category"
                  className="input input-bordered w-full max-w-xs mt-2  dark:text-gray-100 dark:bg-dark placeholder:text-gray-400"
                  onChange={handleInput}
                  required
                  disabled
               />
               <div className="form-control w-full max-w-xs">
                  {loading ? (
                     <button className="btn text-white bg-gradient-to-r from-main via-main to-main hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-orange-800 shadow-lg shadow-main dark:shadow-lg dark:shadow-orange/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-min loading" />
                  ) : (
                     <FormButton
                        text="Subir"
                        type="submit"
                        className="text-white bg-gradient-to-r from-main via-main to-main hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-main dark:focus:ring-main shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 w-min"
                     />
                  )}
               </div>
            </form>
         </div>
         <div className="flex flex-col lg:mt-5 mx-auto max-w-fit max-h-fit">
            <h3 className="text-center text-amber-600 italic mb-3">Imagen preliminar</h3>
            <img src={book.image} alt={book.title} className="rounded-sm" />
         </div>
      </div>
   );
};

export default UploadBook;
