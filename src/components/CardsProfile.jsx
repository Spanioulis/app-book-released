export const CardsProfile = ({ author, district, handleDelete, image, pages, title }) => {
   return (
      <div className="card-profile-content  text-metal dark:text-gray-300 mx-2.5">
         <div className="card-profile">
            <div className="imgBx">
               <img src={image} />
            </div>
            <div className="content">
               <div className="details">
                  <h2>
                     {title}
                     <br />
                     <span>{author}</span>
                  </h2>
                  <div className="data text-metal dark:text-gray-300">
                     <h3>
                        {pages}
                        <br />
                        <span>Pág</span>
                     </h3>
                     <h3>
                        {district}
                        <br />
                        <span>Distrito</span>
                     </h3>
                  </div>
                  <div className="actionBtn">
                     <button onClick={handleDelete}>Eliminar</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
