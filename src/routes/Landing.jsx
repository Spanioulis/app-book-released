import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig';

import Modal from '../components/ReserveModal';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import HeroUpload from '../components/HeroUpload';
import CarouselGroup from '../components/CarouselGroup';

import image from '../assets/book-transparent.png';
import '../styles/loading.css';

const Landing = () => {
   const [books, setBooks] = useState([]);
   console.log('booksLanding', books);

   useEffect(() => {
      async function getData() {
         const booksRefCollection = collection(db, 'books');
         const querySnapshot = await getDocs(booksRefCollection);
         const dataDB = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
         }));
         setBooks(dataDB);
      }

      getData();
   }, []);

   return (
      <>
         <section>
            <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 md:py-20 lg:grid-cols-12 justify-center">
               <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-2xl md:text-4xl  font-bold tracking-tight leading-none  text-metal dark:text-gray-300 text-center lg:text-left">
                     Busca tus libros de proximidad
                  </h1>
                  <p className="max-w-xl mb-5 text-base font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400 text-justify">
                     Busca aquellos libros "liberados" por otros usuarios. Intercámbialos mano a mano en tu barrio,
                     cerca de casa o de tu trabajo, filtrando por tu distrito. Contacta con los otros lectores mediante
                     el chat: hablad, quedad y a leer...
                  </p>
                  <div className="justify-center md:justify-start">
                     <SearchInput
                        text="search"
                        placeholder="Busca un libro..."
                        classInput="input input-bordered w-full text-gray-700 dark:text-gray-700 placeholder-gray-400 dark:placeholder-gray-400 dark:bg-gray-100 focus:border-main dark:focus:border-tahiti focus:ring-main dark:focus:ring-tahiti dark:focus:ring-zinc-500 min-w-2/3"
                        classButton="btn btn-square bg-main dark:bg-tahiti border-main dark:border-tahiti dark:hover:border-zinc-600"
                     />
                  </div>
               </div>
               <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img
                     // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                     src={image}
                     alt="mockup"
                  />
               </div>
            </div>
         </section>
         <section className="text-center">
            <HeroUpload />
         </section>
         <section className="mb-5 pt-20 flex flex-col" id="catalogo">
            {/* TODO -> poner aquí un margin top al primer ShowBook */}
            {/* ShowBooksLanding Card nueva */}
            <CarouselGroup books={books} />
         </section>
         <Modal />
         <Footer />
      </>
   );
};

export default Landing;
