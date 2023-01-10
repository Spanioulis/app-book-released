import React from 'react';

const Edmundo = () => {
   return (
      <>
         <div className="hero md:min-h-screen text-metal dark:text-gray-100  ">
            <div className="hero-content text-center">
               <div className="max-w-lg">
                  <h1 className="text-2xl font-bold">¿Por qué Ed Mundo?</h1>
                  <p className="py-6 font-light">
                     La idea de "liberar" un libro es una metáfora sobre Edmundo Dantés - Dumas, A. (1846).{' '}
                     <i>El Conde de Montecristo</i> -, que estuvo encarcelado 14 años en el castillo de If por causas
                     (traición) que no vienen al caso.
                  </p>
                  <p className="py-6 font-light">
                     ¿Cuántos libros tenemos en nuestras estanterías que hemos leído únicamente una vez o que jamás
                     leeremos? ¿Quieres llenar cajas de estos libros el día final (el de la mudanza)?
                  </p>
                  <p className="py-6 font-light">
                     ¿Por qué no cambiarlos con otros usuarios/lectores y que la cultura corra? En el 2021 se
                     imprimieron unos 198 millones de ejemplares y se vendieron 174 millones. ¿No sería más sostenible
                     "vaciar" nuestras estanterías?
                  </p>
                  <p className="py-6 font-light">¡Libera tu libro!</p>
               </div>
            </div>
         </div>
         <div className="mt-10 flex flex-col justify-center mx-auto"></div>
      </>
   );
};

export default Edmundo;
