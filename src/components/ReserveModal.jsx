export const ReserveModal = () => {
   return (
      <>
         <input type="checkbox" id="my-modal-6" className="modal-toggle" />
         <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box  dark:bg-emerald-900">
               <h3 className="font-bold text-lg">!Enhorabuena, has reservado este libro!</h3>
               <p className="py-4">
                  Espera a que el otro usuario elija un libro de tu biblioteca para que se complete el intercambio.
               </p>
               <div className="modal-action ">
                  <label htmlFor="my-modal-6" className="btn bg-green-800 dark:bg-zinc-900">
                     A leer...
                  </label>
               </div>
            </div>
         </div>
      </>
   );
};
